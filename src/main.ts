import Alpine from 'alpinejs';
import { db } from './firebase';
import { collection, query, where, getDocs, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';

declare global {
  interface Window {
    Alpine: any;
  }
}

// Make Alpine available globally
window.Alpine = Alpine;

document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
    route: window.location.pathname,
    phoneNumber: '',
    
    // Onboarding State
    onboardingStep: 1,
    registerName: '',
    registerTrade: '',
    registerCompany: '',
    registerArea: '',
    calloutFee: 50,
    filterStrictness: 3,
    pulseSchedule: '3days',
    loginError: '',
    isLoggingIn: false,
    
    // Vault State
    newVaultIdea: '',
    newVaultPhase: 3,
    vaultIdeas: [],

    // Simulator State
    simState: 1,
    simMessages: [],
    simInput: '',
    simFilterStrength: 3,
    
    // Calculator variables
    hoursWasted: 5,
    milesDriven: 50,
    hourlyRate: 45,
    fuelCost: 0.45,
    showModal: null,
    get adminDebt() { return Math.round((this.hoursWasted * this.hourlyRate + this.milesDriven * this.fuelCost) * 52); },
    
    // Dashboard variables
    activeTab: 'money', // 'money' | 'safety' | 'business'
    leads: [],
    isLoadingLeads: false,
    selectedLead: null,
    isLeadModalOpen: false,
    unsubscribeLeads: null,
    
    get moneyLeads() {
        return this.leads.filter((l: any) => l.status === 'qualified');
    },

    get safetyLeads() {
        return this.leads.filter((l: any) => l.status === 'archived');
    },

    init() {
      window.addEventListener('popstate', () => {
        this.route = window.location.pathname;
        this.handleRouteLogic();
      });
      
      this.handleRouteLogic();
    },

    handleRouteLogic() {
      if (this.route === '/dashboard') {
        this.subscribeLeads();
      } else {
        this.unsubscribeLeadsListener();
      }

      if (this.route === '/blueprint') {
        this.fetchBlueprintIdeas();
      }

      if (this.route === '/') {
        this.initSimulator();
      }
    },
    
    navigate(path: string) {
      window.history.pushState({}, '', path);
      this.route = path;
      window.scrollTo(0, 0);
      this.handleRouteLogic();
    },

    unsubscribeLeadsListener() {
        if (this.unsubscribeLeads) {
            this.unsubscribeLeads();
            this.unsubscribeLeads = null;
        }
    },
    
    subscribeLeads() {
      this.isLoadingLeads = true;
      try {
        const leadsRef = collection(db, 'leads');
        this.unsubscribeLeads = onSnapshot(leadsRef, (snapshot) => {
            this.leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            this.isLoadingLeads = false;
        }, (error) => {
            console.error("Failed to fetch leads:", error);
            this.isLoadingLeads = false;
        });
      } catch (err) {
        console.error("Failed to setup leads listener:", err);
        this.isLoadingLeads = false;
      }
    },

    async fetchBlueprintIdeas() {
      try {
        const res = await fetch('/api/blueprint');
        if (res.ok) {
          this.vaultIdeas = await res.json();
        }
      } catch (err) {
        console.error("Failed to fetch blueprint ideas:", err);
      }
    },

    async addVaultIdea() {
        if (!this.newVaultIdea || !this.newVaultIdea.trim()) return;
        try {
            const res = await fetch('/api/blueprint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: this.newVaultIdea,
                    phase: Number(this.newVaultPhase) || 3
                })
            });
            
            if (res.ok) {
                const newIdea = await res.json();
                // Optimistic UI update - create new array for guaranteed Alpine reactivity
                this.vaultIdeas = [newIdea, ...this.vaultIdeas];
                this.newVaultIdea = '';
                this.newVaultPhase = 3;
            } else {
                console.error("Server returned error:", await res.text());
            }
        } catch (err) {
            console.error("Failed to add idea:", err);
        }
    },

    async deleteVaultIdea(id: any) {
        // Optimistic UI update
        const previousIdeas = [...this.vaultIdeas];
        this.vaultIdeas = this.vaultIdeas.filter((idea: any) => idea.id !== id);
        
        try {
            const res = await fetch(`/api/blueprint/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) {
                // Revert on failure
                this.vaultIdeas = previousIdeas;
                console.error("Failed to delete idea on server");
            }
        } catch (err) {
            this.vaultIdeas = previousIdeas;
            console.error("Failed to delete idea:", err);
        }
    },

    openLead(lead: any) {
        this.selectedLead = lead;
        this.isLeadModalOpen = true;
    },

    closeLead() {
        this.isLeadModalOpen = false;
        setTimeout(() => { this.selectedLead = null; }, 300);
    },

    async reclaimLead(leadId: string) {
        try {
            const leadRef = doc(db, 'leads', leadId);
            await updateDoc(leadRef, {
                status: 'qualified',
                reclaimedAt: new Date().toISOString()
            });
        } catch (err) {
            console.error("Failed to reclaim lead:", err);
        }
    },

    async simulateLead() {
        try {
            const leadsRef = collection(db, 'leads');
            const randomId = Math.floor(Math.random() * 1000);
            const isQualified = Math.random() > 0.3; // 70% chance of being qualified
            
            await addDoc(leadsRef, {
                customerName: `Test Customer ${randomId}`,
                jobDescription: isQualified ? 'Need a complete rewire of the kitchen. About 4 double sockets and 6 spotlights. Ready to start next week.' : 'Need some electrical work done, not sure what exactly.',
                postcode: isQualified ? 'B14 7TE' : '',
                budget: isQualified ? '1500' : '',
                status: isQualified ? 'qualified' : 'archived',
                createdAt: new Date().toISOString()
            });
        } catch (err) {
            console.error("Failed to simulate lead:", err);
        }
    },

    // Simulator Logic
    initSimulator() {
        this.simState = 1;
        this.simMessages = [
            { sender: 'bot', text: "Hi, I'm the automated assistant for this business. To get you a quote faster, I need a few details." }
        ];
    },

    async sendSimMessage(text: string) {
        if (!text || !text.trim()) return;
        
        const userMsg = text;
        this.simMessages.push({ sender: 'user', text: userMsg });

        // Call our backend webhook to simulate the AI
        try {
            const res = await fetch('/api/whatsapp/webhook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    tradie_id: 'sim_123',
                    current_state: this.simState,
                    filter_strength: this.simFilterStrength,
                    has_media: userMsg.toLowerCase().includes('photo') || userMsg.toLowerCase().includes('pic')
                })
            });
            const data = await res.json();
            
            setTimeout(() => {
                this.simMessages.push({ sender: 'bot', text: data.reply });
                this.simState = data.nextState;
                
                // Auto-scroll simulator
                const simChat = document.getElementById('sim-chat');
                if (simChat) simChat.scrollTop = simChat.scrollHeight;
            }, 600);

        } catch (err) {
            console.error("Simulator error:", err);
        }
    },
    
    async login() {
      this.isLoggingIn = true;
      this.loginError = '';
      
      try {
        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (!phoneRegex.test(this.phoneNumber)) {
          throw new Error('Please enter a valid phone number in E.164 format (e.g., +447700900000)');
        }

        const tradesmenRef = collection(db, 'tradesmen');
        const q = query(tradesmenRef, where('phoneNumber', '==', this.phoneNumber));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          this.navigate('/dashboard');
        } else {
          this.navigate('/onboarding');
        }
      } catch (err: any) {
        this.loginError = err.message || 'Failed to login';
      } finally {
        this.isLoggingIn = false;
      }
    },

    nextOnboardingStep() {
        if (this.onboardingStep < 3) {
            this.onboardingStep++;
        }
    },

    async register() {
      console.log("[ONBOARDING] Starting registration...");
      this.isLoggingIn = true;
      this.loginError = '';
      
      try {
        console.log("[ONBOARDING] Saving to Firestore...");
        const tradesmenRef = collection(db, 'tradesmen');
        await addDoc(tradesmenRef, {
          phoneNumber: this.phoneNumber || '+447000000000',
          name: this.registerName,
          trade: this.registerTrade,
          companyName: this.registerCompany,
          serviceArea: this.registerArea,
          calloutFee: this.calloutFee,
          filterStrictness: this.filterStrictness,
          createdAt: new Date().toISOString()
        });
        console.log("[ONBOARDING] Firestore save successful.");

        // Send email via backend
        console.log("[ONBOARDING] Triggering backend email...");
        
        // Use a timeout for the fetch to ensure we don't hang forever
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        try {
            const emailRes = await fetch('/api/onboarding/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    name: this.registerName,
                    trade: this.registerTrade,
                    phoneNumber: this.phoneNumber,
                    calloutFee: this.calloutFee,
                    filterStrictness: this.filterStrictness,
                    pulseSchedule: this.pulseSchedule
                })
            });
            clearTimeout(timeoutId);

            if (!emailRes.ok) {
                console.error("[ONBOARDING] Email trigger failed (status " + emailRes.status + "), but registration continued.");
            } else {
                console.log("[ONBOARDING] Email trigger successful.");
            }
        } catch (fetchErr) {
            console.warn("[ONBOARDING] Email trigger timed out or failed, proceeding to dashboard anyway.", fetchErr);
        }
        
        console.log("[ONBOARDING] Navigating to dashboard...");
        this.navigate('/dashboard');
      } catch (err: any) {
        console.error("[ONBOARDING] Critical error during registration:", err);
        this.loginError = err.message || 'Failed to register. Please check your connection.';
      } finally {
        this.isLoggingIn = false;
      }
    }
  }));
});

Alpine.start();
