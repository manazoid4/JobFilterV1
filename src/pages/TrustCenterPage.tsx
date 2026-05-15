import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Database, Lock, MessageCircle, FileText, Zap, CheckCircle, Clock, Mail, MessageSquare, Trophy, Medal, AlertTriangle, Eye, Crown } from 'lucide-react';

const verifiedSignals = [
  'Planning approvals in your postcode cluster',
  'Energy upgrade demand across your patch',
  'Recent property ownership changes nearby',
  'New commercial premises activity',
  'Public sector and housing association work',
  'Active building work notifications',
  'Rental market upgrade signals',
  'Property change-of-use activity',
  'Government retrofit and grant-funded work',
];

const antiGhostSteps = [
  {
    num: '01',
    title: 'Official data only',
    body: 'No user-submitted enquiries. Every signal comes from a government or public register.',
    icon: Database,
  },
  {
    num: '02',
    title: 'Scoring before delivery',
    body: 'Weak signals never reach your phone. Only scored leads make it through.',
    icon: Target,
  },
  {
    num: '03',
    title: 'Evidence stack',
    body: 'You see why a lead is scored before you call. Approval timing. Sale recency. Energy demand. You decide if it is worth your time.',
    icon: FileText,
  },
  {
    num: '04',
    title: 'Ghost Risk rating',
    body: 'Every lead gets a LOW, MEDIUM, or HIGH ghost risk. Protect your time.',
    icon: ShieldCheck,
  },
];

const privacyPoints = [
  { label: 'What we collect', value: 'Name, trade, contact, postcode' },
  { label: 'What we do NOT collect', value: 'Financial info, location tracking, browsing history' },
  { label: 'Your rights', value: 'Access, delete, cancel anytime' },
  { label: 'Data retention', value: '12 months after cancellation' },
  { label: 'Third parties', value: 'We do not sell your data. Period.' },
];

const guaranteeFeatures = [
  'One territory lock per founding member',
  'Unlimited lead alerts within locked territory',
  'Unlimited WhatsApp alerts',
  'Unlimited direct letters — 1st class postage included',
  'Full lead scoring + Ghost Risk rating',
  'Pipeline tracking for every opportunity',
  'All free tools included',
  'Founder price locked forever while active',
  '30-day money-back guarantee',
];

export function TrustCenterPage() {
  return (
    <main className="page-shell grid gap-8 py-8 pb-24">
      {/* 1. Hero: Our Promise */}
      <section className="jf-box bg-[var(--ink)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">TRUST CENTER</p>
        <h1 className="headline mt-3 text-4xl leading-none sm:text-6xl">
          WE DON'T SELL SHARED LEADS.<br />
          WE DON'T TAKE COMMISSION.<br />
          WE DON'T LOCK YOU IN.
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-black text-white/80">
          Checkatrade blasts the same lead to 5 trades. Bark sells you a name then makes you fight for it. MyBuilder runs the auction in public. JobFilter does none of that.
        </p>
        <p className="mt-4 max-w-2xl text-lg font-black text-white/80">
          We scan verified signals. Score every opportunity. Send the good ones to your WhatsApp — controlled by trade, patch, and timing. No shared auction. No five-trade blast.
        </p>
        <p className="mt-4 max-w-2xl text-lg font-black text-[var(--yellow)]">
          Use JobFilter for 30 days. Set up your territory. View your leads. If you don't see at least one job worth chasing, we refund every penny. No quibbles.
        </p>
      </section>

      {/* 2. How Scoring Works */}
      <section className="jf-box bg-white p-8">
        <p className="micro-label text-[var(--orange)]">HOW SCORING WORKS</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          EVERY SIGNAL GETS A SERIOUS BUYER SCORE FROM 0 TO 100.
        </h2>
        <p className="mt-4 max-w-2xl copy">
          Not guesswork. Verified signals. Approval timing. Sale recency. Energy demand. Contract status. All combined into one score — 0 to 100.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { score: '90-100', label: 'GOLD', action: 'Call within 24 hours', color: 'bg-[var(--green)] text-white', icon: Trophy, tag: '90% of revenue comes from GOLD' },
            { score: '75-89', label: 'SILVER', action: 'Call within 48 hours', color: 'bg-[var(--yellow)] text-[var(--ink)]', icon: Medal, tag: 'Worth watching' },
            { score: '60-74', label: 'BRONZE', action: 'Verify first', color: 'bg-[var(--orange)] text-white', icon: AlertTriangle, tag: 'Check before quoting' },
            { score: 'Below 60', label: 'CHECK', action: 'Proceed with caution', color: 'bg-[var(--muted)] text-white', icon: Eye, tag: 'Low confidence signal' },
          ].map((tier) => {
            const Icon = tier.icon;
            const isGold = tier.label === 'GOLD';
            return (
              <div key={tier.label} className={`jf-box p-5 ${tier.color} ${isGold ? 'ring-4 ring-[var(--yellow)] ring-offset-2' : ''}`}>
                <div className="flex items-center gap-2">
                  <Icon size={isGold ? 28 : 22} strokeWidth={3} />
                  <p className="micro-label opacity-80">{tier.score}</p>
                </div>
                <p className={`headline mt-2 ${isGold ? 'text-3xl' : 'text-2xl'}`}>{tier.label}</p>
                <p className="mt-2 text-sm font-black opacity-90">{tier.action}</p>
                {isGold && (
                  <div className="mt-3 inline-flex items-center gap-1 border border-white/40 bg-white/15 px-2 py-1 text-[10px] font-black uppercase">
                    <Crown size={12} strokeWidth={3} />
                    {tier.tag}
                  </div>
                )}
                {!isGold && (
                  <p className="mt-3 text-[10px] font-black uppercase opacity-70">{tier.tag}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 jf-box bg-[var(--bg-main)] p-6">
          <p className="micro-label text-[var(--muted)]">TRANSPARENCY NOTE</p>
          <p className="mt-2 font-black text-[var(--muted)]">
            We show you the evidence behind every score — approval timing, sale recency, energy demand level, contract status. You see what we see. You decide if it's worth your time.
          </p>
        </div>
      </section>

      {/* 3. Verified Signals */}
      <section className="jf-box bg-[var(--yellow)] p-8">
        <p className="micro-label text-[var(--ink)]">VERIFIED SIGNALS</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          NINE TYPES OF SIGNAL. ALL VERIFIED. ALL BEFORE IT REACHES YOUR PHONE.
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-black text-[var(--ink)]/75">
          No scraped directories. No user-submitted enquiries. Every signal comes from verified official UK sources.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {verifiedSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-3 jf-box bg-white p-4">
              <CheckCircle size={20} strokeWidth={3} className="text-[var(--green)] shrink-0" />
              <span className="font-black text-[var(--ink)] text-sm">{signal}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 border-2 border-[var(--ink)] bg-white">
          <p className="text-sm font-black text-[var(--ink)]">
            <strong>Our rule:</strong> We do not scrape private homeowner data. We do not sell your information. We do not share which signals we monitor — that is how the filter stays private.
          </p>
        </div>
      </section>

      {/* 4. Anti-Ghost Philosophy */}
      <section className="jf-box bg-white p-8">
        <p className="micro-label text-[var(--orange)]">ANTI-GHOST PHILOSOPHY</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          GHOST LEADS COST TRADESMEN £2,000-5,000 A YEAR.
        </h2>
        <p className="mt-4 max-w-2xl copy">
          Wasted fuel. Wasted time. Wasted hope. We built JobFilter to stop that.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {antiGhostSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="jf-box bg-[var(--bg-main)] p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-[var(--ink)] bg-[var(--yellow)]">
                    <Icon size={20} strokeWidth={2.5} className="text-[var(--ink)]" />
                  </div>
                  <div>
                    <p className="micro-label text-[var(--yellow)]">{step.num}</p>
                    <p className="headline text-lg">{step.title}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm font-black text-[var(--muted)]">{step.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-6 border-2 border-[var(--orange)] bg-[var(--orange)]/5">
          <p className="headline text-2xl text-[var(--orange)]">
            "Half your site visits are to people who will never buy. We flag the time-wasters before you waste fuel."
          </p>
        </div>
      </section>

      {/* 5. Privacy First */}
      <section className="jf-box bg-[var(--ink)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">PRIVACY FIRST</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          WE COLLECT THE MINIMUM. YOU CONTROL THE REST.
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {privacyPoints.map((point) => (
            <div key={point.label} className="border-2 border-white/20 p-4">
              <p className="micro-label text-[var(--yellow)]">{point.label}</p>
              <p className="mt-1 font-black text-white/90">{point.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 border-2 border-[var(--green)] bg-[var(--green)]/10">
          <p className="text-sm font-black text-[var(--green)]">
            <Lock size={16} className="inline mr-2" />
            GDPR compliant. ICO registered. Right to erasure. Right to access. Right to portability.
          </p>
        </div>
      </section>

      {/* 6. Fair Use & Refunds */}
      <section className="jf-box bg-white p-8">
        <p className="micro-label text-[var(--green)]">FAIR USE & REFUNDS</p>
        <h2 className="headline mt-3 text-4xl leading-none text-[var(--green)]">
          30-DAY MONEY-BACK GUARANTEE.
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-black text-[var(--muted)]">
          Use JobFilter for 30 days. Set up your territory and WhatsApp alerts. View at least 10 scored leads. If you genuinely don't see one job worth chasing, we refund every penny. No hoops. We just ask that you actually use the system — this filter exists to stop tyre-kickers, not tradesmen.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guaranteeFeatures.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <CheckCircle size={18} strokeWidth={3} className="text-[var(--green)] shrink-0" />
              <span className="font-black text-[var(--ink)] text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/pricing" className="jf-button bg-[var(--yellow)] text-[var(--ink)]">
            SEE PRICING →
          </Link>
          <Link to="/find-jobs" className="jf-button bg-[var(--navy)] text-white">
            TRY FREE SCAN
          </Link>
        </div>
      </section>

      {/* 7. Contact */}
      <section className="jf-box bg-[var(--yellow)] p-8">
        <p className="micro-label text-[var(--ink)]">CONTACT</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          QUESTIONS? CONCERNS? TALK TO US DIRECTLY.
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-black text-[var(--ink)]/75">
          No chatbots. No ticket systems. Direct contact with the team.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a href="mailto:support@jobfilter.uk" className="jf-box bg-white p-5 flex items-center gap-3 hover:border-[var(--ink)]">
            <Mail size={24} strokeWidth={2.5} className="text-[var(--navy)]" />
            <div>
              <p className="headline text-lg">Email</p>
              <p className="text-sm font-black text-[var(--muted)]">support@jobfilter.uk</p>
            </div>
          </a>
          <a href="mailto:support@jobfilter.uk" className="jf-box bg-white p-5 flex items-center gap-3 hover:border-[var(--green)]">
            <MessageSquare size={24} strokeWidth={2.5} className="text-[var(--green)]" />
            <div>
              <p className="headline text-lg">Support</p>
              <p className="text-sm font-black text-[var(--muted)]">Same-day reply</p>
            </div>
          </a>
        </div>

        <p className="mt-6 text-sm font-black text-[var(--ink)]/70">
          Response time: Within 4 hours, Monday to Friday.
        </p>
      </section>
    </main>
  );
}
