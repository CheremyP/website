export type WorksCase = {
  id: number;
  quote: string;
  name: string;
  role: string;
  clientName: string;
  sector: string;
  year: string;
  image: string;
  logo: string;
  slug: string;
};

export const worksCasesData: WorksCase[] = [
  {
    id: 1,
    quote: 'Full service, co-creation, and customer orientation at the highest level. The AI infrastructure implementation was flawless.',
    name: 'Tobias Schaller',
    role: 'Managing Director',
    clientName: 'Beton',
    sector: 'Construction',
    year: '2023',
    image: '/works/construction.jpg',
    logo: '/logos/beton.svg',
    slug: 'beton',
  },
  {
    id: 2,
    quote: 'State-of-the-art AI systems that seamlessly integrated into our healthcare operations.',
    name: 'Marcus van der Berg',
    role: 'Operations Director',
    clientName: 'PMC',
    sector: 'Healthcare',
    year: '2024',
    image: '/works/hospital.jpg',
    logo: '/logos/pmc_logo.svg',
    slug: 'pmc',
  },
  {
    id: 3,
    quote: 'Very professional agency: clearly structured, reliable, and the generative AI agents have exceeded our expectations.',
    name: 'Albert Gruber',
    role: 'Co-Founder',
    clientName: 'KPN',
    sector: 'Telecommunications',
    year: '2024',
    image: '/works/kpn.jpg',
    logo: '/logos/kpn_logo.svg',
    slug: 'kpn',
  },
  {
    id: 4,
    quote: 'We have successfully implemented complex predictive models together. The collaboration was always productive and pleasant.',
    name: 'Nikolaus Serner',
    role: 'Managing Partner',
    clientName: 'Tata Steel',
    sector: 'Manufacturing',
    year: '2023',
    image: '/works/steel.jpg',
    logo: '/logos/tata_logo.svg',
    slug: 'tata-steel',
  },
  {
    id: 5,
    quote: 'Their computer vision solutions revolutionized our quality control pipeline. A highly recommended AI partner.',
    name: 'Sarah Visser',
    role: 'Head of Innovation',
    clientName: 'LVNL',
    sector: 'Aviation',
    year: '2024',
    image: '/works/aviation.jpg',
    logo: '/logos/lvnl_logo.svg',
    slug: 'lvnl',
  },
  {
    id: 6,
    quote: 'Outstanding AI automations that accelerated our digital transformation journey.',
    name: 'Elena Rostova',
    role: 'Chief Technology Officer',
    clientName: 'VZ',
    sector: 'Technology',
    year: '2023',
    image: '/works/vz.jpg',
    logo: '/logos/vz.svg',
    slug: 'vz',
  },
];
