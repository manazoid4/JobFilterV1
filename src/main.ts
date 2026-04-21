import Alpine from 'alpinejs';
import { db, auth } from './firebase';
import { collection, query, where, getDocs, addDoc, onSnapshot, doc, updateDoc, getDocFromServer } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

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
    onboardingPostcode: '',
    scanState: 'idle', // 'idle' | 'searching' | 'revealed'
    scannedLeads: [],
    
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerTrade: '',
    registerCompany: '',
    registerArea: '',
    calloutFee: 50,
    filterStrictness: 3,
    pulseSchedule: '3days',
    loginEmail: '',
    loginPassword: '',
    loginError: '',
    isLoggingIn: false,
    user: { uid: 'dev-user', email: 'dev@jobfilter.uk' },
    isAuthReady: true,
    isEmailVerified: true,
    verificationMessage: '',
    subscriptionStatus: 'active',

    handleFirestoreError(error: any, operationType: string, path: string | null) {
      const errInfo = {
        error: error instanceof Error ? error.message : String(error),
        authInfo: {
          userId: auth.currentUser?.uid,
          email: auth.currentUser?.email,
          emailVerified: auth.currentUser?.emailVerified,
          isAnonymous: auth.currentUser?.isAnonymous,
          tenantId: auth.currentUser?.tenantId,
          providerInfo: auth.currentUser?.providerData.map(provider => ({
            providerId: provider.providerId,
            displayName: provider.displayName,
            email: provider.email,
            photoUrl: provider.photoURL
          })) || []
        },
        operationType,
        path
      };
      console.error('Firestore Error: ', JSON.stringify(errInfo));
      if (errInfo.error.includes('Missing or insufficient permissions')) {
          this.loginError = "Permission denied. Please ensure you are logged in and have an active subscription.";
      }
      throw new Error(JSON.stringify(errInfo));
    },

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
    isSimTyping: false,
    simInput: '',
    simFilterStrength: 3,
    
    // Dashboard variables
    activeTab: 'overview', // 'overview' | 'leads' | 'jobs' | 'safety' | 'business'
    showModal: null,
    tab: 'money',
    detailLead: null,
    showQuote: false,
    quoteTarget: null,
    quoteText: '',
    quoteGenerating: false,
    toastMsg: '',
    toastShow: false,
    dispatcherOn: true,
    receiptProcessing: false,
    receipts: [
      {id:1, merchant:'Screwfix — Tools & Fixings', date:'12 Apr 2025', cat:'Tools', amount:'142.80', vat:'23.80'},
      {id:2, merchant:'Shell Garage, Carlisle', date:'11 Apr 2025', cat:'Fuel', amount:'89.40', vat:'14.90'},
      {id:3, merchant:'Travis Perkins, CA1', date:'10 Apr 2025', cat:'Materials', amount:'314.20', vat:'52.37'}
    ],
    get receiptTotal() { return this.receipts.reduce((s: number,r: any) => s + parseFloat(r.amount), 0).toFixed(2); },
    get receiptVAT() { return this.receipts.reduce((s: number,r: any) => s + parseFloat(r.vat), 0).toFixed(2); },
    quotes: 6,
    miles: 30,
    get annualDebt() {
        return Math.round((this.quotes * 1.5 * 45 + this.miles * 0.20) * 52);
    },
    get savings() {
        return Math.round(this.annualDebt * 0.85);
    },
    leads: [],
    jobs: [],
    isLoadingLeads: false,
    selectedLead: null,
    isLeadModalOpen: false,
    unsubscribeLeads: null,
    
    // Trade Tools State
    selectedTradeTool: null,
    
    // Workshop & AI Receptionist State
    aiPersonality: 'professional',
    aiGreeting: 'Hi, thanks for contacting [Company]. To give you an accurate quote, I need a few details first.',
    aiAutoReply: true,
    workshopTools: [
      { id: 'quote', name: 'Instant Quote Gen', icon: '📄', desc: 'Generate professional PDF quotes in seconds.' },
      { id: 'invoice', name: 'Smart Invoicing', icon: '💰', desc: 'Send invoices that get paid faster.' },
      { id: 'schedule', name: 'AI Scheduler', icon: '📅', desc: 'Let customers book into your free slots.' }
    ],

    // Brand Hub State
    brandColor: '#facc15',
    brandBio: 'Professional tradesperson serving the local area. Quality guaranteed.',
    brandReviews: [
      { author: 'John D.', rating: 5, text: 'Great service, very professional.' },
      { author: 'Sarah M.', rating: 5, text: 'Highly recommend for any plumbing work.' }
    ],
    
    async checkSubscription() {
        if (!this.user) return;
        console.log("[STRIPE EXTENSION] Checking subscription status...");
        const path = `customers/${this.user.uid}/subscriptions`;
        // The Stripe extension stores subscriptions in /customers/{uid}/subscriptions
        const subRef = collection(db, 'customers', this.user.uid, 'subscriptions');
        const q = query(subRef, where('status', 'in', ['active', 'trialing']));
        
        try {
            const snap = await getDocs(q);
            if (!snap.empty) {
                this.subscriptionStatus = 'active';
                console.log("[STRIPE EXTENSION] Active subscription found.");
                if (this.route === '/activation-pending') {
                    this.navigate('/dashboard');
                }
            } else {
                this.subscriptionStatus = 'none';
                console.log("[STRIPE EXTENSION] No active subscription.");
            }
        } catch (err) {
            this.handleFirestoreError(err, 'list', path);
            this.subscriptionStatus = 'none';
        }
    },
    
    get moneyLeads() {
        return this.leads.filter((l: any) => l.status === 'qualified' && !l.completed);
    },

    get safetyLeads() {
        return this.leads.filter((l: any) => l.status === 'archived');
    },

    openDetail(lead: any) { this.detailLead = lead; },
    closeDetail() { this.detailLead = null; },
    completeLead(id: any) {
      const l = this.leads.find((x: any) => x.id === id);
      if(l) { l.completed = true; this.closeDetail(); this.toast('✓ Job marked complete. Brand Hub updating...'); }
    },
    toast(msg: string) { this.toastMsg = msg; this.toastShow = true; setTimeout(() => this.toastShow = false, 3500); },
    genQuote(lead: any) {
      this.quoteTarget = lead; this.showQuote = true; this.quoteGenerating = true; this.quoteText = '';
      const lines = ['QUOTE REF: JF-2025-'+Math.floor(Math.random()*9000+1000)+'\n','Date: '+new Date().toLocaleDateString('en-GB')+'\n\n','To Whom It May Concern,\n\n','Thank you for your enquiry via JobFilter. Please find below our quote.\n\n','SCOPE OF WORKS\n','──────────────────────────────────\n',lead.summary+'\n\n','PRICING BREAKDOWN\n','──────────────────────────────────\n','Materials (estimated):    '+lead.budget+'\n','Labour:                   Included\n','Site protection & cleanup: Included\n\n','TOTAL (incl. VAT):        '+lead.budget+'\n\n','INCLUSIONS\n','──────────────────────────────────\n','✓ Full clean-up on completion\n','✓ 12-month workmanship guarantee\n','✓ Gas Safe / NICEIC certified work\n','✓ All waste disposal included\n\n','Valid for 14 days. To accept, reply YES.\n\n','Kind regards,\nScott — SR Trades, Carlisle\nwww.jobfilter.uk/sr-trades'];
      let i=0; const iv=setInterval(()=>{if(i<lines.length){this.quoteText+=lines[i++];}else{clearInterval(iv);this.quoteGenerating=false;}},55);
    },
    logReceipt() {
      this.receiptProcessing = true;
      setTimeout(() => {
        const merchants = ['Toolstation','Wickes','Jewson','HSS Hire','Dulux Decorator'];
        const cats = ['Tools','Materials','Hire','Paint','Fixings'];
        const idx = Math.floor(Math.random()*5);
        const amt = (Math.random()*200+20).toFixed(2);
        const vat = (parseFloat(amt)/6).toFixed(2);
        this.receipts.unshift({id:Date.now(),merchant:merchants[idx]+', Carlisle',date:new Date().toLocaleDateString('en-GB'),cat:cats[idx],amount:amt,vat:vat});
        this.receiptProcessing = false;
        this.toast('✓ Receipt scanned. Merchant, VAT and total extracted.');
      }, 2000);
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
        // LOCK REMOVED: Preserving dev user if no real user is found
        if (user) {
            this.user = user;
            this.isEmailVerified = user.emailVerified;
            this.checkSubscription();
        } else {
            console.log("[AUTH] No user found, staying in DEV MODE");
        }
        this.isAuthReady = true;
        this.handleRouteLogic();
      });

      // Auto-refresh email status when user returns to the tab
      window.addEventListener('focus', () => {
          if (this.route === '/activation-pending' && this.user && !this.isEmailVerified) {
              this.refreshEmailStatus();
          }
      });

      // Removed synchronous this.handleRouteLogic() to prevent querying before auth resolves
    },

    handleRouteLogic() {
      if (!this.isAuthReady) return; // Prevent logic before auth state is confirmed

      // LOCK REMOVED: Bypassing auth and verification redirects
      
      if (this.route === '/dashboard') {
        this.subscribeLeads();
        this.subscribeJobs();
      } else {
        this.unsubscribeLeadsListener();
      }

      if (this.route === '/blueprint') {
        this.fetchBlueprintIdeas();
      }

      if (this.route === '/onboarding') {
        this.initSimulator();
      }

      if (this.route === '/intake') {
        console.log("[INTAKE] Engine page loaded.");
      }

      if (this.route === '/trade-tools') {
        console.log("[TRADE TOOLS] Page loaded.");
      }
    },
    
    navigate(path: string) {
      window.history.pushState({}, '', path);
      this.route = path;
      window.scrollTo(0, 0);
      
      // Reset scan state when navigating to onboarding
      if (path === '/onboarding') {
        this.scanState = 'idle';
        this.onboardingPostcode = '';
        this.scannedLeads = [];
      }
      
      this.handleRouteLogic();
    },

    startScan() {
      if (!this.onboardingPostcode) return;
      this.scanState = 'searching';
      setTimeout(() => {
        this.scannedLeads = [
          { id: 1, title: 'Single Storey Extension', addressSnippet: 'Walmley Road, Solihull', trade: 'GENERAL', value: '45,000' },
          { id: 2, title: 'Dormer Loft Conversion', addressSnippet: 'Hagley Road, Edgbaston', trade: 'ROOFER', value: '38,000' },
          { id: 3, title: 'Full Refurbishment', addressSnippet: 'Lichfield Road, Sutton Coldfield', trade: 'GENERAL', value: '110,000' }
        ];
        this.scanState = 'revealed';
      }, 3000);
    },

    unsubscribeLeadsListener() {
        if (this.unsubscribeLeads) {
            this.unsubscribeLeads();
            this.unsubscribeLeads = null;
        }
    },
    
    subscribeLeads() {
      this.isLoadingLeads = true;
      if (!auth.currentUser) {
          console.log("[DEV MODE] No authenticated user. Injecting mock leads instead of querying Firestore.");
          this.leads = [
              { id: 'mock1', customerName: 'John Smith', postcode: 'B14 7QH', description: 'Requires full house rewire. Has budget ready.', budget: '£3,500', status: 'qualified', createdAt: new Date().toISOString() },
              { id: 'mock2', customerName: 'Sarah Jenkins', postcode: 'B13 8DD', description: 'Emergency boiler replacement. No heating currently.', budget: '£2,200', status: 'qualified', createdAt: new Date().toISOString() }
          ];
          this.isLoadingLeads = false;
          return;
      }
      try {
        const leadsRef = collection(db, 'leads');
        this.unsubscribeLeads = onSnapshot(leadsRef, (snapshot) => {
            this.leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            this.isLoadingLeads = false;
        }, (error) => {
            this.handleFirestoreError(error, 'list', 'leads');
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

    async convertLeadToJob(lead: any) {
        if (!lead) return;
        console.log("[JOBS] Converting lead to job:", lead.id);
        try {
            const jobsRef = collection(db, 'jobs');
            await addDoc(jobsRef, {
                leadId: lead.id,
                customerName: lead.customerName,
                customerPhone: lead.customerPhone,
                customerAddress: lead.customerAddress || 'No address provided',
                trade: lead.trade,
                budget: lead.budget,
                description: lead.description,
                status: 'pending',
                createdAt: new Date().toISOString(),
                uid: this.user.uid
            });
            
            // Mark lead as converted
            const leadRef = doc(db, 'leads', lead.id);
            await updateDoc(leadRef, {
                status: 'converted'
            });
            
            this.closeLead();
            alert("Job created! View it in the Jobs tab.");
        } catch (err) {
            console.error("[JOBS] Conversion error:", err);
            alert("Failed to create job. Please try again.");
        }
    },

    subscribeJobs() {
        if (!auth.currentUser) {
            console.log("[DEV MODE] No authenticated user. Injecting mock jobs instead of querying Firestore.");
            this.jobs = [
                { id: 'job-mock1', customerName: 'John Smith', customerPhone: '07700 900123', status: 'pending', budget: '£3,500', description: 'Full house rewire.' }
            ];
            return;
        }
        if (!this.user) return;
        console.log("[JOBS] Subscribing to jobs...");
        const jobsRef = collection(db, 'jobs');
        const q = query(jobsRef, where('uid', '==', this.user.uid));
        onSnapshot(q, (snapshot) => {
            this.jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }, (err) => {
            this.handleFirestoreError(err, 'list', 'jobs');
        });
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
            const randomId = Math.floor(Math.random() * 9000) + 1000;
            const isQualified = Math.random() > 0.3; // 70% chance of being qualified
            
            const projects = [
                { type: 'Extension', desc: 'Large wrap-around kitchen extension with bi-fold doors.', size: 'large' },
                { type: 'Loft Conversion', desc: 'Dormer loft conversion for a new master bedroom.', size: 'large' },
                { type: 'New Build', desc: 'Single detached 3-bed dwelling on private plot.', size: 'large' },
                { type: 'Refurbishment', desc: 'Full house refurbishment including new kitchen and bathroom.', size: 'medium' },
                { type: 'Repair', desc: 'Small electrical repair and socket replacement.', size: 'small' },
                { type: 'Maintenance', desc: 'Gutter cleaning and minor roof tile replacement.', size: 'small' }
            ];
            
            const project = projects[Math.floor(Math.random() * projects.length)];
            const tier = (project.size === 'large') ? 'HAMMER' : 'SCOUT';
            const price = tier === 'HAMMER' ? '£60' : '£30';
            
            const areas = ['Birmingham', 'Solihull', 'Sutton Coldfield', 'Dudley', 'Walsall'];
            const area = areas[Math.floor(Math.random() * areas.length)];
            
            let hammerHook = '';
            if (tier === 'HAMMER') {
                hammerHook = `I saw the approved plans for your new ${project.desc.toLowerCase()} in ${area} and would love to discuss the build with you.`;
            }

            await addDoc(leadsRef, {
                lead_id: `JF-${randomId}`,
                customerName: `Customer ${randomId}`,
                jobDescription: isQualified ? project.desc : 'Need some work done, not sure what exactly.',
                postcode: isQualified ? 'B14 7TE' : '',
                budget: isQualified ? (project.size === 'large' ? '45000' : '1500') : '',
                status: isQualified ? 'qualified' : 'archived',
                tier: isQualified ? tier : null,
                price: isQualified ? price : null,
                hammer_hook: hammerHook,
                area: area,
                project_type: project.type,
                createdAt: new Date().toISOString(),
                uid: this.user?.uid || 'dev-user'
            });
        } catch (err: any) {
            console.error("Failed to simulate lead. Error details:", {
                message: err.message,
                code: err.code,
                path: 'leads',
                user: this.user?.uid
            });
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
        this.isSimTyping = true;

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
                this.isSimTyping = false;
                this.simMessages.push({ sender: 'bot', text: data.reply });
                this.simState = data.nextState;
                
                // Auto-scroll simulator
                const simChat = document.getElementById('sim-chat');
                if (simChat) {
                    setTimeout(() => {
                        simChat.scrollTop = simChat.scrollHeight;
                    }, 50);
                }
            }, 1500);

        } catch (err) {
            this.isSimTyping = false;
            console.error("Simulator error:", err);
        }
    },
    
    async login() {
      this.isLoggingIn = true;
      this.loginError = '';
      
      try {
        console.log("[AUTH] Attempting login...");
        const userCredential = await signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword);
        
        if (!userCredential.user.emailVerified) {
            this.navigate('/activation-pending');
        } else {
            this.navigate('/dashboard');
        }
      } catch (err: any) {
        console.error("[AUTH] Login error:", err);
        this.loginError = err.message || 'Failed to login. Check your credentials.';
      } finally {
        this.isLoggingIn = false;
      }
    },

    async logout() {
      try {
        await auth.signOut();
        this.user = null;
        this.navigate('/');
        this.toast('✓ Logged out successfully.');
      } catch (err) {
        console.error("Logout error:", err);
      }
    },

    nextOnboardingStep() {
        if (this.onboardingStep < this.onboardingTotalSteps) {
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
        const path = 'tradesmen';
        const tradesmenRef = collection(db, path);
        
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

        try {
            await Promise.race([firestorePromise, timeoutPromise]);
            console.log("[ONBOARDING] Firestore save successful.");
        } catch (err) {
            this.handleFirestoreError(err, 'create', path);
            throw err;
        }

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
