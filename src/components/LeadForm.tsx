import { useId, useState, type FormEvent } from 'react';
import { business, waHref } from '../config';
import { serviceOptions } from '../content';

type Props = { service: string; onService: (value: string) => void };

export default function LeadForm({ service, onService }: Props) {
  const [sentHref, setSentHref] = useState('');
  const id = useId();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const note = String(data.get('note') || '').trim();
    const lines = [
      `Hello ${business.name}, I would like help with: ${service}`,
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      note && `Details: ${note}`,
    ].filter(Boolean);
    const href = waHref(lines.join('\n'));
    setSentHref(href);
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={submit} className="grid min-w-0 gap-4 self-center rounded-md bg-white p-6 text-ink shadow-2xl sm:p-8">
      <div>
        <h2 className="font-display text-2xl font-bold">Request a quote</h2>
        <p className="mt-1 text-sm text-slate">Your details open as a WhatsApp message for you to send.</p>
      </div>
      <label className="field">
        Full name
        <input id={`${id}-name`} name="name" autoComplete="name" required />
      </label>
      <label className="field">
        Phone number
        <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="+971" required />
      </label>
      <label className="field">
        Service
        <select id={`${id}-service`} name="service" value={service} onChange={(e) => onService(e.target.value)}>
          {serviceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="field">
        Details (optional)
        <textarea id={`${id}-note`} name="note" rows={3} />
      </label>
      <button type="submit" className="btn btn-primary w-full">Continue on WhatsApp</button>
      {sentHref && (
        <p role="status" className="text-sm text-slate">
          WhatsApp did not open?{' '}
          <a className="font-semibold text-brand underline" href={sentHref} target="_blank" rel="noopener noreferrer">
            Open your message
          </a>
        </p>
      )}
    </form>
  );
}
