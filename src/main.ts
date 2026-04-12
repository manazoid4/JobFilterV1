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
    registerName: '',
    registerTrade: '',
    registerCompany: '',
    registerArea: '',
    loginError: '',
    isLoggingIn: false,
    
    // Calculator variables
    hoursWasted: 5,
    milesDriven: 50,
    hourlyRate: 45,
    fuelCost: 0.45,
    showModal: null,
    get adminDebt() { return Math.round((this.hoursWasted * this.hourlyRate + this.milesDriven * this.fuelCost) * 52); },
    
    // Dashboard variables
    activeTab: 'money', // 'money' | 'safety'
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
        if (this.route === '/dashboard') {
          this.subscribeLeads();
        } else {
          this.unsubscribe();
        }
      });
      
      // Initial fetch if starting on dashboard
      if (this.route === '/dashboard') {
        this.subscribeLeads();
      }
    },
    
    navigate(path: string) {
      window.history.pushState({}, '', path);
      this.route = path;
      window.scrollTo(0, 0);
      if (path === '/dashboard') {
        this.subscribeLeads();
      } else {
        this.unsubscribe();
      }
    },

    unsubscribe() {
        if (this.unsubscribeLeads) {
            this.unsubscribeLeads();
            this.unsubscribeLeads = null;
        }
    },
    
    subscribeLeads() {
      this.isLoadingLeads = true;
      try {
        const leadsRef = collection(db, 'leads');
        // In a real app, we would filter by the logged-in tradesman's ID
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

    async requestUpsell() {
        alert("Upsell request sent to admin! We will contact you shortly to build your brand.");
        // In a real app, this would trigger an API call or write to a 'requests' collection
    },
    
    async login() {
      this.isLoggingIn = true;
      this.loginError = '';
      
      try {
        // Basic E.164 validation (starts with + and has 10-15 digits)
        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (!phoneRegex.test(this.phoneNumber)) {
          throw new Error('Please enter a valid phone number in E.164 format (e.g., +447700900000)');
        }

        const tradesmenRef = collection(db, 'tradesmen');
        const q = query(tradesmenRef, where('phoneNumber', '==', this.phoneNumber));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          // User exists, go to dashboard
          this.navigate('/dashboard');
        } else {
          // User doesn't exist, redirect to onboarding
          this.navigate('/onboarding');
        }
      } catch (err: any) {
        this.loginError = err.message || 'Failed to login';
      } finally {
        this.isLoggingIn = false;
      }
    },

    async register() {
      this.isLoggingIn = true;
      this.loginError = '';
      
      try {
        const tradesmenRef = collection(db, 'tradesmen');
        await addDoc(tradesmenRef, {
          phoneNumber: this.phoneNumber,
          name: this.registerName,
          trade: this.registerTrade,
          companyName: this.registerCompany,
          serviceArea: this.registerArea,
          createdAt: new Date().toISOString()
        });
        
        this.navigate('/dashboard');
      } catch (err: any) {
        this.loginError = err.message || 'Failed to register';
      } finally {
        this.isLoggingIn = false;
      }
    }
  }));
});

Alpine.start();
