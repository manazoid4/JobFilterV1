import Alpine from 'alpinejs';
import { db, auth } from './firebase';
import { collection, query, where, getDocs, addDoc, onSnapshot, doc, updateDoc, getDocFromServer } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';

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
    registerEmail: '',
    registerPassword: '',
    registerTrade: '',
    registerCompany: '',
    registerArea: '',
    calloutFee: 50,
    filterStrictness: 3,
    pulseSchedule: '3days',
    loginError: '',
    isLoggingIn: false,
    user: null,
    isEmailVerified: false,
    verificationMessage: '',

    async refreshEmailStatus() {
        if (!auth.currentUser) return;
        console.log("[AUTH] Manually refreshing user status...");
        try {
            await auth.currentUser.reload();
            this.user = auth.currentUser;
            this.isEmailVerified = auth.currentUser.emailVerified;
            if (this.isEmailVerified) {
                this.verificationMessage = "Success! Your email is verified.";
                this.checkSubscription();
            } else {
                this.verificationMessage = "Still waiting... make sure you clicked the link in your email.";
            }
        } catch (err: any) {
            console.error("[AUTH] Reload error:", err);
            this.verificationMessage = "Error checking status. Please try again.";
        }
    },

    async resendVerification() {
        if (!auth.currentUser) return;
        console.log("[AUTH] Resending verification email...");
        try {
            await sendEmailVerification(auth.currentUser);
            this.verificationMessage = "Verification email resent! Check your inbox.";
        } catch (err: any) {
            console.error("[AUTH] Resend error:", err);
            this.verificationMessage = "Too many attempts. Please wait a few minutes.";
        }
    },
    
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
    subscriptionStatus: 'loading', // 'active' | 'past_due' | 'none' | 'loading'
    
    async checkSubscription() {
        if (!this.user) return;
        console.log("[STRIPE EXTENSION] Checking subscription status...");
        // The Stripe extension stores subscriptions in /customers/{uid}/subscriptions
        const subRef = collection(db, 'customers', this.user.uid, 'subscriptions');
        const q = query(subRef, where('status', 'in', ['active', 'trialing']));
        
        try {
            const snap = await getDocs(q);
            if (!snap.empty) {
                this.subscriptionStatus = 'active';
                console.log("[STRIPE EXTENSION] Active subscription found.");
            } else {
                this.subscriptionStatus = 'none';
                console.log("[STRIPE EXTENSION] No active subscription.");
            }
        } catch (err) {
            console.error("[STRIPE EXTENSION] Error checking sub:", err);
            this.subscriptionStatus = 'none';
        }
    },
    
    get moneyLeads() {
        return this.leads.filter((l: any) => l.status === 'qualified');
    },

    get safetyLeads() {
        return this.leads.filter((l: any) => l.status === 'archived');
    },

    async init() {
      window.addEventListener('popstate', () => {
        this.route = window.location.pathname;
        this.handleRouteLogic();
      });
      
      // Test Firestore Connection
      try {
          console.log("[FIREBASE] Testing connection...");
          await getDocFromServer(doc(db, '_connection_test_', 'ping'));
          console.log("[FIREBASE] Connection successful.");
      } catch (error: any) {
          if (error.message && error.message.includes('the client is offline')) {
              console.error("[FIREBASE] CRITICAL: Client is offline. Check your Firebase configuration.");
              this.loginError = "Database is offline. Please check your internet or Firebase setup.";
          } else {
              // Ignore other errors (like document not found) as they still mean we're connected
              console.log("[FIREBASE] Connection test completed (doc might not exist, but we are online).");
          }
      }

      onAuthStateChanged(auth, (user) => {
        this.user = user;
        this.isEmailVerified = user?.emailVerified || false;
        console.log("[AUTH] State changed:", user ? "Logged In" : "Logged Out", "Verified:", this.isEmailVerified);
        if (user) {
            this.checkSubscription();
        }
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
      
      // Safety timeout to reset the button if everything hangs
      const safetyTimeout = setTimeout(() => {
          if (this.isLoggingIn) {
              console.warn("[ONBOARDING] Safety timeout reached. Forcing UI reset.");
              this.isLoggingIn = false;
              this.loginError = "Connection is slow. We're still trying to activate your account in the background...";
          }
      }, 20000);

      try {
        // 1. Create Firebase Auth Account
        console.log("[AUTH] Creating account...");
        const userCredential = await createUserWithEmailAndPassword(auth, this.registerEmail, this.registerPassword);
        const user = userCredential.user;
        
        // 2. Send Verification Email
        console.log("[AUTH] Sending verification email...");
        await sendEmailVerification(user);

        // 3. Save to Firestore
        console.log("[ONBOARDING] Saving to Firestore...");
        const tradesmenRef = collection(db, 'tradesmen');
        
        // Wrap Firestore addDoc in a timeout
        const firestorePromise = addDoc(tradesmenRef, {
          uid: user.uid,
          email: this.registerEmail,
          phoneNumber: this.phoneNumber || '+447000000000',
          name: this.registerName,
          trade: this.registerTrade,
          companyName: this.registerCompany,
          serviceArea: this.registerArea,
          calloutFee: this.calloutFee,
          filterStrictness: this.filterStrictness,
          createdAt: new Date().toISOString(),
          isActive: false
        });

        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Firestore timeout")), 12000)
        );

        await Promise.race([firestorePromise, timeoutPromise]);
        console.log("[ONBOARDING] Firestore save successful.");

        // 4. Send email via backend
        console.log("[ONBOARDING] Triggering backend email...");
        
        const controller = new AbortController();
        const fetchTimeoutId = setTimeout(() => controller.abort(), 4000);

        try {
            await fetch('/api/onboarding/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    name: this.registerName,
                    trade: this.registerTrade,
                    phoneNumber: this.phoneNumber,
                    email: this.registerEmail,
                    calloutFee: this.calloutFee,
                    filterStrictness: this.filterStrictness,
                    pulseSchedule: this.pulseSchedule
                })
            });
            clearTimeout(fetchTimeoutId);
            console.log("[ONBOARDING] Email trigger successful.");
        } catch (fetchErr) {
            console.warn("[ONBOARDING] Email trigger failed or timed out, proceeding anyway.", fetchErr);
        }
        
        console.log("[ONBOARDING] Navigating to activation pending...");
        clearTimeout(safetyTimeout);
        this.navigate('/activation-pending');
      } catch (err: any) {
        console.error("[ONBOARDING] Critical error during registration:", err);
        clearTimeout(safetyTimeout);
        this.loginError = err.message === "Firestore timeout" 
            ? "Database connection timed out. Please try again or use the bypass button."
            : (err.message || 'Failed to register. Please check your connection.');
      } finally {
        this.isLoggingIn = false;
      }
    },

    async startSubscription() {
        console.log("[STRIPE] Starting checkout...");
        this.isLoggingIn = true;
        try {
            const res = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.registerEmail || this.user?.email,
                    uid: this.user?.uid
                })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error("Failed to create checkout session");
            }
        } catch (err: any) {
            console.error("[STRIPE] Error:", err);
            this.loginError = "Payment system unavailable. Please try again later.";
        } finally {
            this.isLoggingIn = false;
        }
    }
  }));
});

Alpine.start();
