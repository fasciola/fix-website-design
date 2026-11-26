// Business details used across the whole site. Edit these before going live.
export const business = {
  name: 'Four Pillars',
  tagline: 'Public Relations Management',
  // As registered with Dubai Economy and Tourism.
  legalName: 'Four Pillars for Public Relations Management',
  legalNameArabic: 'فور بيلرز لإدارة العلاقات العامة',
  licenceNo: '1673173',
  registerNo: '2963546',
  whatsapp: '971557272048',
  phone: '+971 55 727 2048',
  // Leave empty to hide the email line.
  email: 'yousif_abdelmalik@outlook.com',
  address: 'Abu Hail, Deira, Dubai, UAE',
};

export const telHref = `tel:${business.phone.replace(/\s/g, '')}`;

export const waHref = (message: string) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
