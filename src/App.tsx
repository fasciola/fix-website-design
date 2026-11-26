import { useState } from 'react';
import { Check, Mail, MapPin, Menu, MessageCircle, Phone, Plus, X } from 'lucide-react';
import LeadForm from './components/LeadForm';
import { business, telHref, waHref } from './config';
import { checklists, faqs, jurisdictions, reasons, serviceOptions, services, steps } from './content';

const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;
const hello = waHref(`Hello ${business.name}, I need help with PRO services.`);
const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

const nav = [
  ['Services', '#services'],
  ['Documents', '#documents'],
  ['Process', '#process'],
  ['FAQ', '#faq'],
  ['Contact', '#contact'],
];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="wrap flex h-18 items-center justify-between gap-4">
        <a href="#top" className="leading-tight">
          <span className="block font-display text-xl font-extrabold">{business.name}</span>
          <span className="block text-xs text-slate">{business.tagline}</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-brand">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href={telHref} className="hidden items-center gap-2 text-sm font-semibold md:flex">
            <Phone size={16} aria-hidden /> {business.phone}
          </a>
          <div className="hidden sm:block">
            <a href={hello} {...external} className="btn btn-primary">
              <MessageCircle size={16} aria-hidden /> WhatsApp
            </a>
          </div>
          <button type="button" className="p-2 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="wrap grid gap-1 border-t border-line py-3 lg:hidden">
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="py-2 font-medium">{label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Documents() {
  const [active, setActive] = useState(0);
  const list = checklists[active];

  return (
    <section id="documents" className="section bg-mist">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="min-w-0">
          <h2 className="title">Check your documents before you start</h2>
          <p className="lead">One missing paper can stall an application. Pick one to see what is usually asked for.</p>
          <div className="mt-8 grid gap-2">
            {checklists.map((item, i) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={`cursor-pointer rounded-md border px-4 py-3 text-left font-semibold transition-colors ${
                  i === active ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div className="min-w-0 self-start rounded-md border border-line bg-white p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink pb-4">
            <h3 className="font-display text-xl font-bold">{list.name}</h3>
            <span className="stamp">{list.docs.length} documents</span>
          </div>
          <ul>
            {list.docs.map((doc) => (
              <li key={doc} className="flex gap-3 border-b border-line py-4">
                <Check size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 mb-6 text-sm text-slate">
            A typical list only. Requirements differ by authority and change over time, so we confirm yours before filing.
          </p>
          <a href={waHref(`Hello ${business.name}, please check my documents for: ${list.name}`)} {...external} className="btn btn-primary">
            Ask us to check yours
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [service, setService] = useState(serviceOptions[0]);

  return (
    <div id="top">
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-ink text-white">
          <img src={asset('about-office.jpg')} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-ink/85" />
          <div className="wrap grid gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
            <div className="min-w-0 self-center">
              <h1 className="font-display text-4xl leading-[1.05] font-extrabold text-balance sm:text-6xl">
                PRO services in Dubai, handled from file to stamp
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/80">
                Visas, trade licences, labour permits and attestation for companies and families. We prepare the paperwork, submit it and follow it up.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={hello} {...external} className="btn btn-gold">
                  <MessageCircle size={18} aria-hidden /> Chat on WhatsApp
                </a>
                <a href={telHref} className="btn btn-ghost">
                  <Phone size={18} aria-hidden /> {business.phone}
                </a>
              </div>
              <ul className="mt-10 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
                {['Mainland and free zone companies', 'Government and service fees itemised', 'Individual and family applications', 'Renewal date tracking'].map((point) => (
                  <li key={point} className="flex gap-2">
                    <Check size={18} className="shrink-0 text-gold" aria-hidden /> {point}
                  </li>
                ))}
              </ul>
            </div>
            <LeadForm service={service} onService={setService} />
          </div>
        </section>

        <div className="border-b border-line">
          <div className="wrap flex flex-wrap items-center gap-x-8 gap-y-2 py-5 text-sm">
            <span className="font-semibold">Applications go to authorities such as</span>
            {['DET', 'GDRFA', 'ICP', 'MOHRE', 'Dubai Courts', 'Dubai Municipality'].map((name) => (
              <span key={name} className="text-slate">{name}</span>
            ))}
          </div>
        </div>

        <section id="services" className="section">
          <div className="wrap">
            <h2 className="title">Services</h2>
            <p className="lead">Send us a single transaction or hand over the whole company file.</p>
            <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {services.map(({ icon: Icon, title, items }) => (
                <article key={title} className="flex min-w-0 flex-col bg-white p-6">
                  <Icon size={28} className="text-brand" aria-hidden />
                  <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
                  <ul className="mt-3 mb-5 grid gap-2 text-sm text-slate">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a href="#contact" onClick={() => setService(title)} className="mt-auto text-sm font-bold text-brand hover:underline">
                    Get a quote<span className="sr-only"> for {title}</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Documents />

        <section id="process" className="section">
          <div className="wrap">
            <h2 className="title">How a request moves</h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <li key={step.title} className="border-t-2 border-ink pt-5">
                  <span className="text-sm font-bold text-brand">Step {i + 1}</span>
                  <h3 className="mt-2 font-display text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-slate">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section bg-ink text-white">
          <div className="wrap grid gap-12 lg:grid-cols-2">
            <div className="min-w-0 self-center">
              <h2 className="title">What you can expect from us</h2>
              <p className="mt-4 max-w-md text-lg text-white/75">
                Government work depends on dates and details. This is how we keep yours in order.
              </p>
            </div>
            <dl className="min-w-0">
              {reasons.map((reason) => (
                <div key={reason.title} className="border-b border-white/15 py-5">
                  <dt className="font-display text-xl font-bold text-gold">{reason.title}</dt>
                  <dd className="mt-2 text-white/75">{reason.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2 className="title">Mainland, free zone or offshore?</h2>
            <p className="lead">The jurisdiction decides your licence, visas and where you can trade. We help you compare before you pay.</p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {jurisdictions.map((item) => (
                <article key={item.name} className="flex flex-col rounded-md border border-line p-6">
                  <h3 className="font-display text-2xl font-bold">{item.name}</h3>
                  <p className="mt-3 mb-6 text-slate">{item.text}</p>
                  <p className="mt-auto border-t border-line pt-4 text-sm">
                    <strong>Often suits</strong> {item.fit}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section bg-mist">
          <div className="wrap">
            <h2 className="title">Common questions</h2>
            <div className="mt-8 grid max-w-3xl gap-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-md border border-line bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold">
                    {faq.q}
                    <Plus size={18} className="shrink-0 text-brand group-open:rotate-45" aria-hidden />
                  </summary>
                  <p className="px-5 pb-5 text-slate">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section bg-brand text-white">
          <div className="wrap grid gap-12 lg:grid-cols-2">
            <div className="min-w-0 self-center">
              <h2 className="title">Hand us the paperwork</h2>
              <p className="mt-4 max-w-md text-lg text-white/85">Tell us the service you need. We reply with the document list and a quote.</p>
              <ul className="mt-10 grid gap-5">
                <li><a href={telHref} className="flex gap-3"><Phone aria-hidden /> {business.phone}</a></li>
                <li><a href={hello} {...external} className="flex gap-3"><MessageCircle aria-hidden /> WhatsApp +{business.whatsapp}</a></li>
                {business.email && (
                  <li><a href={`mailto:${business.email}`} className="flex gap-3 break-all"><Mail className="shrink-0" aria-hidden /> {business.email}</a></li>
                )}
                <li className="flex gap-3"><MapPin className="shrink-0" aria-hidden /> {business.address}</li>
              </ul>
            </div>
            <LeadForm service={service} onService={setService} />
          </div>
        </section>
      </main>

      <footer className="bg-ink py-10 text-sm text-white/70">
        <div className="wrap grid gap-3">
          <p className="font-display text-lg font-bold text-white">{business.legalName}</p>
          <p lang="ar" dir="rtl" className="justify-self-start">{business.legalNameArabic}</p>
          <p>
            Dubai licence no. {business.licenceNo} · Commercial register no. {business.registerNo}
          </p>
          <p className="max-w-2xl">
            A private service provider, not a government entity. Approvals, timelines and government fees are set by the relevant authorities.
          </p>
          <p>© {new Date().getFullYear()} {business.legalName}</p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-white p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:hidden">
        <a href={telHref} className="btn border border-ink text-ink"><Phone size={16} aria-hidden /> Call</a>
        <a href={hello} {...external} className="btn btn-primary"><MessageCircle size={16} aria-hidden /> WhatsApp</a>
      </div>
    </div>
  );
}
