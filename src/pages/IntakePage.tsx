import { ChangeEvent, ReactNode, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { saveStoredLead } from '../lib/leadStore';
import type { LeadDecision } from '../lib/types';

const jobTypes = ['Electrical', 'Plumbing', 'Roofing', 'Building'];
const urgencyTypes: LeadDecision['urgency'][] = ['Emergency', 'This week', 'Later'];
const budgetOptions = ['Under £500', '£500–£2,000', '£2,000–£5,000', '£5,000+'];

export function IntakePage() {
  const { username = 'tradesman' } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [jobType, setJobType] = useState('');
  const [urgency, setUrgency] = useState<LeadDecision['urgency']>('This week');
  const [budget, setBudget] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [postcode, setPostcode] = useState('');
  const [hasPhotos, setHasPhotos] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function pickJob(value: string) {
    setJobType(value);
    setStep(2);
  }

  function pickUrgency(value: LeadDecision['urgency']) {
    setUrgency(value);
    setStep(3);
  }

  function pickBudget(value: string) {
    setBudget(value);
    setStep(4);
  }

  function onPhoto(event: ChangeEvent<HTMLInputElement>) {
    setHasPhotos(Boolean(event.target.files?.length));
  }

  async function submit() {
    setSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/intake/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobType, urgency, details, postcode, phone, budget, hasPhotos, username }),
      });
      const payload = await response.json() as { lead?: LeadDecision; errors?: string[] };
      if (!response.ok || !payload.lead) {
        throw new Error(payload.errors?.[0] ?? 'Could not score your request. Please try again.');
      }
      saveStoredLead(payload.lead);
      navigate(`/leads/${payload.lead.id}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <main className="page-shell grid min-h-[calc(100svh-126px)] content-center py-10 pb-24 md:min-h-[calc(100vh-72px)] md:pb-8">
      <section className="jf-box bg-white p-7">
        <p className="micro-label text-[var(--orange)]">JOBFILTER FOR {username}</p>

        {step === 1 && (
          <Step title="What's the job?">
            {jobTypes.map((item) => (
              <button key={item} className="choice-button" onClick={() => pickJob(item)}>{item}</button>
            ))}
          </Step>
        )}

        {step === 2 && (
          <Step title="When do you need it?">
            {urgencyTypes.map((item) => (
              <button key={item} className="choice-button" onClick={() => pickUrgency(item)}>{item}</button>
            ))}
          </Step>
        )}

        {step === 3 && (
          <Step title="What's your budget?">
            {budgetOptions.map((item) => (
              <button key={item} className="choice-button" onClick={() => pickBudget(item)}>{item}</button>
            ))}
          </Step>
        )}

        {step === 4 && (
          <div>
            <h1 className="headline mt-3 text-4xl leading-none sm:text-5xl">ADD DETAILS</h1>
            <div className="mt-6 grid gap-3">
              <input className="field-input" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Your mobile number" />
              <input className="field-input" value={postcode} onChange={(event) => setPostcode(event.target.value.toUpperCase())} placeholder="Postcode" />
              <textarea className="field-input min-h-28 resize-none" value={details} onChange={(event) => setDetails(event.target.value)} placeholder="Optional details" />
              <input className="field-input" type="file" accept="image/*" multiple onChange={onPhoto} />
              {submitError && (
                <p className="border-2 border-[var(--orange)] bg-[var(--bg-main)] p-3 font-black text-[var(--orange)]">{submitError}</p>
              )}
              <button className="jf-button bg-[var(--yellow)] text-[var(--ink)]" disabled={submitting} onClick={() => void submit()}>
                {submitting ? 'SENDING…' : 'SEND REQUEST'}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h1 className="headline mt-3 text-4xl leading-none sm:text-5xl">{title}</h1>
      <div className="mt-6 grid gap-3">{children}</div>
    </div>
  );
}
