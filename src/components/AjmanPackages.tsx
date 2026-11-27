import { useState } from 'react';
import { Check, MessageCircle } from 'lucide-react';
import { business, waHref } from '../config';

// Prices copied from github.com/fasciola/four-pillars-premium. Update them here.
const packages = [
  { visas: 0, registration: 4888, renewal: 4888 },
  { visas: 1, registration: 10800, renewal: 9900 },
  { visas: 2, registration: 16200, renewal: 13950 },
  { visas: 3, registration: 20700, renewal: 17550 },
  { visas: 4, registration: 25200, renewal: 21150 },
  { visas: 5, registration: 29700, renewal: 24750 },
  { visas: 6, registration: 34200, renewal: 28350 },
  { visas: 7, registration: 38700, renewal: 31950 },
];

const visaCostItems = [
  ['Visa allocation fee', 1000],
  ['Security pre-approval', 200],
  ['Establishment card', 500],
  ['E-Channel', 2300],
  ['Entry permit', 950],
  ['Visa status change', 800],
  ['Medical', 350],
  ['Residence visa and Emirates ID', 1900],
] as const;

const costTypes = [
  ['registration', 'New registration'],
  ['renewal', 'Renewal'],
] as const;

const aed = (amount: number) => `AED ${amount.toLocaleString('en-AE')}`;
const visaLabel = (visas: number) => `${visas} ${visas === 1 ? 'visa' : 'visas'}`;

const choice = (selected: boolean) =>
  `cursor-pointer rounded-md border px-4 py-3 text-left transition-colors ${
    selected ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink'
  }`;

export default function AjmanPackages() {
  const [visas, setVisas] = useState(1);
  const [costType, setCostType] = useState<'registration' | 'renewal'>('registration');

  const selected = packages[visas];
  const total = selected[costType];
  const typeLabel = costType === 'registration' ? 'new registration' : 'renewal';
  const message = `Hello ${business.name}, I am interested in the Ajman licence package: ${visaLabel(visas)}, ${typeLabel}, estimate ${aed(total)}. Please confirm the quotation.`;

  return (
    <section id="ajman" className="section">
      <div className="wrap">
        <h2 className="title">Ajman licence and visa packages from {aed(packages[1].registration)}</h2>
        <p className="lead">
          That is the price of a new licence with 1 visa. Packages run from 0 to 7 visas. Choose yours to see the estimate for registration or renewal.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid min-w-0 content-start gap-8">
            <fieldset>
              <legend className="mb-3 font-bold">Number of visas</legend>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {packages.map((item) => (
                  <button key={item.visas} type="button" aria-pressed={item.visas === visas} onClick={() => setVisas(item.visas)} className={choice(item.visas === visas)}>
                    <span className="block font-display text-lg font-bold">{visaLabel(item.visas)}</span>
                    <span className="block text-xs">{aed(item[costType])}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-bold">Cost type</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {costTypes.map(([key, label]) => (
                  <button key={key} type="button" aria-pressed={key === costType} onClick={() => setCostType(key)} className={choice(key === costType)}>
                    <span className="block font-bold">{label}</span>
                    <span className="block text-sm">{aed(selected[key])}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            {visas > 0 && (
              <div>
                <h3 className="font-bold">Visa and Emirates ID cost items</h3>
                <p className="mt-1 text-sm text-slate">
                  Part of the package price. They are listed for transparency and are not added to the total again.
                </p>
                <ul className="mt-3 grid gap-x-8 md:grid-cols-2">
                  {visaCostItems.map(([label, price]) => (
                    <li key={label} className="flex items-center gap-3 border-b border-line py-3 text-sm">
                      <Check size={16} className="shrink-0 text-brand" aria-hidden />
                      <span className="min-w-0 grow">{label}</span>
                      <span className="font-semibold whitespace-nowrap tabular-nums">{aed(price)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="min-w-0 self-start rounded-md bg-mist p-6 sm:p-8 lg:sticky lg:top-28">
            <p className="text-sm font-semibold text-slate">Estimated package total</p>
            <p aria-live="polite" className="mt-1 font-display text-4xl font-extrabold tabular-nums sm:text-5xl">{aed(total)}</p>
            <p className="mt-2 font-semibold">
              Ajman licence, {visaLabel(visas)}, {typeLabel}
            </p>
            <p className="mt-4 mb-6 text-sm text-slate">This is an estimate. We confirm the final quotation for your business activity.</p>
            <a href={waHref(message)} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
              <MessageCircle size={16} aria-hidden /> Confirm on WhatsApp
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
