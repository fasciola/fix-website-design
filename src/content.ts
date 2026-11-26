import {
  BadgeCheck,
  Briefcase,
  Building2,
  FileCheck2,
  IdCard,
  Landmark,
  Stamp,
  Users,
} from 'lucide-react';

export const services = [
  {
    icon: IdCard,
    title: 'Visa processing',
    items: ['Employment and investor visas', 'Renewals and cancellations', 'Status change and entry permits'],
  },
  {
    icon: Users,
    title: 'Family and Golden Visa',
    items: ['Spouse, children and parents', 'Domestic worker visas', 'Golden Visa applications'],
  },
  {
    icon: FileCheck2,
    title: 'Trade licence',
    items: ['New licence and renewal', 'Activity and name amendments', 'Partner changes and liquidation'],
  },
  {
    icon: Briefcase,
    title: 'Labour and MOHRE',
    items: ['Work permits and labour contracts', 'Establishment card updates', 'Quota requests and cancellations'],
  },
  {
    icon: BadgeCheck,
    title: 'Emirates ID and medical',
    items: ['Emirates ID applications', 'Medical fitness bookings', 'Biometrics appointment follow-up'],
  },
  {
    icon: Stamp,
    title: 'Attestation and translation',
    items: ['Certificate attestation', 'Legal translation', 'Notary and court documents'],
  },
  {
    icon: Building2,
    title: 'Company formation',
    items: ['Mainland, free zone and offshore', 'Trade name and initial approval', 'Bank account opening support'],
  },
  {
    icon: Landmark,
    title: 'Approvals and compliance',
    items: ['Ejari and utility registration', 'Municipality and authority permits', 'Corporate Tax and VAT registration'],
  },
];

export const serviceOptions = [...services.map((s) => s.title), 'Something else'];

// Typical starting documents. Authorities change requirements, so the page says to confirm.
export const checklists = [
  {
    name: 'New employment visa',
    docs: [
      'Passport copy (at least 6 months validity)',
      'Passport photo on a white background',
      'Company trade licence',
      'Establishment card',
      'Signed job offer',
      'Attested certificate, for skilled roles',
    ],
  },
  {
    name: 'Family visa',
    docs: [
      'Sponsor passport, visa and Emirates ID',
      'Family member passports and photos',
      'Attested marriage certificate',
      'Attested birth certificates for children',
      'Salary certificate or labour contract',
      'Registered tenancy contract (Ejari)',
    ],
  },
  {
    name: 'Trade licence renewal',
    docs: [
      'Current trade licence',
      'Valid tenancy contract (Ejari)',
      'Passport and Emirates ID copies of owners',
      'External approvals, if your activity needs them',
    ],
  },
  {
    name: 'Certificate attestation',
    docs: [
      'Original certificate',
      'Passport copy of the holder',
      'Attestation from the issuing country',
      'Authorisation letter, if someone files for you',
    ],
  },
];

export const steps = [
  { title: 'Tell us what you need', text: 'Send the form or a WhatsApp message with the service and your company type.' },
  { title: 'Get your checklist and quote', text: 'We list the documents required and separate government fees from our service fee.' },
  { title: 'We file and follow up', text: 'We prepare the application, submit it and chase queries from the authority.' },
  { title: 'Receive your documents', text: 'You get the approved documents and a note of the next renewal date.' },
];

export const jurisdictions = [
  {
    name: 'Mainland',
    text: 'Trade across the UAE local market. In Dubai the licence comes from the Department of Economy and Tourism.',
    fit: 'retail, contracting, services to local clients',
  },
  {
    name: 'Free zone',
    text: 'Licensed by a free zone authority, with its own rules, packages and visa allocation.',
    fit: 'international trade, consulting, technology',
  },
  {
    name: 'Offshore',
    text: 'A holding or international business structure. It does not provide UAE residence visas.',
    fit: 'asset holding, cross-border ownership',
  },
];

export const reasons = [
  { title: 'One point of contact', text: 'The same coordinator handles your file from first message to final stamp.' },
  { title: 'Fees shown up front', text: 'Government charges and our service fee appear as separate lines on your quote.' },
  { title: 'Renewal reminders', text: 'We track expiry dates for licences, visas and cards so you can act before fines apply.' },
  { title: 'Status you can check', text: 'Ask on WhatsApp where an application stands and what is holding it.' },
];

export const faqs = [
  { q: 'What does a PRO do?', a: 'A Public Relations Officer handles your company’s dealings with government departments: preparing documents, submitting applications and following up on approvals.' },
  { q: 'Do I need an in-house PRO?', a: 'Not necessarily. Many small and mid-sized companies outsource the work and pay per transaction or by retainer, in place of a full-time salary.' },
  { q: 'How long does a visa take?', a: 'It depends on the visa type, where the applicant is and the authority’s workload. We give you an estimate for your case once we have seen the documents.' },
  { q: 'I missed my trade licence renewal. Can you help?', a: 'Yes. Send us the expired licence. We check which penalties apply and what is needed to renew it.' },
  { q: 'Do you handle personal and family applications?', a: 'Yes. Family sponsorship, domestic worker visas and certificate attestation are all open to individuals.' },
  { q: 'Are you a government office?', a: 'No. We are a private service provider that prepares and submits applications on your behalf. Approval decisions rest with the relevant authority.' },
];
