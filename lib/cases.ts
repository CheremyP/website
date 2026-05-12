import { cache } from 'react';

export type BlockType =
  | 'text'
  | 'image'
  | 'image-pair'
  | 'quote';

export interface BaseBlock {
  type: BlockType;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  heading?: string;
  content: string;
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
  fullWidth?: boolean;
}

export interface ImagePairBlock extends BaseBlock {
  type: 'image-pair';
  srcLeft: string;
  altLeft: string;
  srcRight: string;
  altRight: string;
}

export interface QuoteBlock extends BaseBlock {
  type: 'quote';
  text: string;
  author?: string;
  role?: string;
}

export type CaseBlock = TextBlock | ImageBlock | ImagePairBlock | QuoteBlock;

export interface Case {
  slug: string;
  title: string;
  client: string;
  sector: string;
  year: string;
  services: string[];
  thumbnail: string;
  heroImage: string;
  summary: string;
  blocks: CaseBlock[];
}

export const casesData: Case[] = [
  {
    slug: 'beton',
    title: 'Flawless AI Infrastructure for Modern Construction',
    client: 'Beton',
    sector: 'Construction',
    year: '2023',
    services: ['Cloud & Data Infrastructure', 'AI Strategy'],
    thumbnail: '/works/construction.jpg',
    heroImage: '/works/construction.jpg',
    summary: 'Building a robust, scalable data foundation to power predictive supply chain analytics for a leading construction materials provider.',
    blocks: [
      {
        type: 'text',
        heading: 'The Challenge',
        content: 'Beton was struggling with fragmented data silos across multiple legacy ERP systems. Forecasting cement and material demand was heavily reliant on manual spreadsheets, leading to supply chain bottlenecks, overstocking of perishable materials, and an inability to swiftly react to market fluctuations.'
      },
      {
        type: 'image-pair',
        srcLeft: '/works/construction.jpg',
        altLeft: 'Construction site overview',
        srcRight: '/works/steel.jpg',
        altRight: 'Steel and concrete analysis'
      },
      {
        type: 'text',
        heading: 'The Solution',
        content: 'We designed a unified cloud data lake and implemented a robust MLOps pipeline. By centralizing their data streams, we deployed machine learning models capable of analyzing historical delivery data, real-time weather forecasts, and construction site progress to dynamically predict material requirements.'
      },
      {
        type: 'image',
        src: '/works/hospital.jpg',
        alt: 'Data architecture visualization',
        caption: 'Centralized data flow connecting multiple ERP systems.',
        fullWidth: true
      },
      {
        type: 'quote',
        text: 'Full service, co-creation, and customer orientation at the highest level. The AI infrastructure implementation was flawless.',
        author: 'Tobias Schaller',
        role: 'Managing Director, Beton'
      },
      {
        type: 'text',
        heading: 'The Impact',
        content: 'The new infrastructure reduced material waste by 18% in the first two quarters. Automated demand forecasting decreased logistics overhead, ensuring sites received exactly what they needed, precisely when they needed it.'
      }
    ]
  },
  {
    slug: 'pmc',
    title: 'Integrating Intelligent Systems into Healthcare Operations',
    client: 'PMC',
    sector: 'Healthcare',
    year: '2024',
    services: ['AI Automations', 'Agentic AI'],
    thumbnail: '/works/hospital.jpg',
    heroImage: '/works/hospital.jpg',
    summary: 'Automating administrative workflows and patient triaging in a high-volume clinical environment without compromising care quality.',
    blocks: [
      {
        type: 'text',
        heading: 'The Challenge',
        content: 'PMC’s administrative staff were overwhelmed by the sheer volume of appointment scheduling, preliminary patient triaging, and documentation processing. This administrative burden was increasing wait times and reducing the amount of time healthcare professionals could spend with actual patients.'
      },
      {
        type: 'image',
        src: '/works/hospital.jpg',
        alt: 'Modern healthcare facility',
        caption: 'Optimizing patient flow and administrative pipelines.',
        fullWidth: false
      },
      {
        type: 'text',
        heading: 'The Solution',
        content: 'We developed an agentic AI system strictly compliant with healthcare data regulations. The system handles inbound patient communications, extracts relevant medical history using NLP, and intelligently routes scheduling requests. We also implemented automated post-consultation documentation pipelines.'
      },
      {
        type: 'quote',
        text: 'State-of-the-art AI systems that seamlessly integrated into our healthcare operations.',
        author: 'Marcus van der Berg',
        role: 'Operations Director, PMC'
      },
      {
        type: 'image-pair',
        srcLeft: '/works/vz.jpg',
        altLeft: 'AI interface dashboard',
        srcRight: '/works/aviation.jpg',
        altRight: 'Operations center'
      },
      {
        type: 'text',
        heading: 'The Impact',
        content: 'Administrative workload was reduced by 35%, dropping patient onboarding time from 15 minutes to under 5. Medical staff reported higher satisfaction due to streamlined documentation, allowing them to focus entirely on patient care.'
      }
    ]
  },
  {
    slug: 'kpn',
    title: 'Transforming Legacy Customer Support with Generative AI',
    client: 'KPN',
    sector: 'Telecommunications',
    year: '2024',
    services: ['AI Strategy', 'Agentic AI & GenAI'],
    thumbnail: '/works/kpn.jpg',
    heroImage: '/works/kpn.jpg',
    summary: 'A complete overhaul of customer service operations using LLM-driven agents to reduce resolution times by 40% while improving customer satisfaction.',
    blocks: [
      {
        type: 'text',
        heading: 'The Challenge',
        content: 'Our client faced an ever-growing volume of complex customer inquiries that strained their existing support infrastructure. Legacy rule-based chatbots were failing to parse nuance, leading to high escalation rates and frustrated users. They needed a system capable of understanding context, querying internal knowledge bases, and generating accurate, human-like responses in real time.'
      },
      {
        type: 'image-pair',
        srcLeft: '/works/kpn.jpg',
        altLeft: 'Telecom infrastructure',
        srcRight: '/works/vz.jpg',
        altRight: 'Digital transformation dashboard'
      },
      {
        type: 'text',
        heading: 'The Solution',
        content: 'We designed and deployed a multi-agent AI architecture. By fine-tuning a foundational LLM on the client’s historical support data and integrating it with their live CRM via a secure retrieval-augmented generation (RAG) pipeline, we empowered the system to handle 60% of Tier 1 and Tier 2 tickets autonomously.'
      },
      {
        type: 'image',
        src: '/works/steel.jpg',
        alt: 'Server infrastructure',
        caption: 'High-availability RAG pipeline deployment.',
        fullWidth: true
      },
      {
        type: 'quote',
        text: 'Very professional agency: clearly structured, reliable, and the generative AI agents have exceeded our expectations.',
        author: 'Albert Gruber',
        role: 'Co-Founder, KPN'
      },
      {
        type: 'text',
        heading: 'The Impact',
        content: 'The implementation of this agentic architecture didn\'t just reduce overhead; it transformed how customers experience the brand. Average handling time dropped by 40%, and customer satisfaction scores for automated interactions surpassed human baseline metrics for the first time in the company\'s history.'
      }
    ]
  },
  {
    slug: 'tata-steel',
    title: 'Complex Predictive Modeling for Heavy Manufacturing',
    client: 'Tata Steel',
    sector: 'Manufacturing',
    year: '2023',
    services: ['Cloud & Data Infrastructure', 'AI Strategy'],
    thumbnail: '/works/steel.jpg',
    heroImage: '/works/steel.jpg',
    summary: 'Leveraging sensor data and advanced machine learning to predict equipment failures and optimize metallurgical processes.',
    blocks: [
      {
        type: 'text',
        heading: 'The Challenge',
        content: 'Tata Steel operates massive, continuous manufacturing processes where unexpected equipment downtime costs millions per hour. They needed a way to utilize the terabytes of data generated by factory floor sensors to predict failures before they happen and optimize the energy consumption of their furnaces.'
      },
      {
        type: 'text',
        heading: 'The Solution',
        content: 'We built a high-throughput data ingestion pipeline and developed complex predictive maintenance models. By analyzing vibration, temperature, and acoustic data in real-time, the models detect anomalous patterns indicative of impending mechanical wear.'
      },
      {
        type: 'quote',
        text: 'We have successfully implemented complex predictive models together. The collaboration was always productive and pleasant.',
        author: 'Nikolaus Serner',
        role: 'Managing Partner, Tata Steel'
      },
      {
        type: 'text',
        heading: 'The Impact',
        content: 'Unplanned downtime was reduced by 22%. Furthermore, the optimization algorithms applied to the furnace heating cycles resulted in a 4% reduction in overall energy consumption, directly translating to massive cost savings and a lower carbon footprint.'
      }
    ]
  },
  {
    slug: 'lvnl',
    title: 'Computer Vision Solutions for Aviation Quality Control',
    client: 'LVNL',
    sector: 'Aviation',
    year: '2024',
    services: ['AI Automations', 'Agentic AI'],
    thumbnail: '/works/aviation.jpg',
    heroImage: '/works/aviation.jpg',
    summary: 'Revolutionizing visual inspection pipelines using state-of-the-art computer vision and real-time edge computing.',
    blocks: [
      {
        type: 'text',
        heading: 'The Challenge',
        content: 'Manual visual inspections in aviation components are slow, expensive, and prone to human error due to fatigue. LVNL needed a highly reliable, automated method to inspect complex geometries for micro-fractures and surface defects.'
      },
      {
        type: 'text',
        heading: 'The Solution',
        content: 'We implemented a custom computer vision pipeline deployed on edge hardware directly on the inspection floor. Using advanced convolutional neural networks trained on thousands of annotated defect samples, the system scans components via high-resolution industrial cameras in real-time.'
      },
      {
        type: 'quote',
        text: 'Their computer vision solutions revolutionized our quality control pipeline. A highly recommended AI partner.',
        author: 'Sarah Visser',
        role: 'Head of Innovation, LVNL'
      },
      {
        type: 'text',
        heading: 'The Impact',
        content: 'Inspection throughput increased by 300% while reducing the false-negative rate to near zero. The automated system provided a consistent, auditable trail of quality control that significantly improved overall safety compliance.'
      }
    ]
  },
  {
    slug: 'vz',
    title: 'Accelerating Digital Transformation via AI Automations',
    client: 'VZ',
    sector: 'Technology',
    year: '2023',
    services: ['AI Automations', 'Cloud & Data Infrastructure'],
    thumbnail: '/works/vz.jpg',
    heroImage: '/works/vz.jpg',
    summary: 'Modernizing internal workflows and drastically reducing manual data entry for a fast-scaling tech enterprise.',
    blocks: [
      {
        type: 'text',
        heading: 'The Challenge',
        content: 'As VZ scaled rapidly, their internal operations became bogged down by manual data entry, disconnected SaaS platforms, and repetitive reporting tasks. Highly skilled employees were spending up to 15 hours a week simply moving data between systems.'
      },
      {
        type: 'text',
        heading: 'The Solution',
        content: 'We audited their entire operational workflow and implemented targeted AI automations. Utilizing intelligent document processing (IDP) and robotic process automation (RPA), we seamlessly bridged the gaps between their core platforms, automatically categorizing and routing incoming data.'
      },
      {
        type: 'quote',
        text: 'Outstanding AI automations that accelerated our digital transformation journey.',
        author: 'Elena Rostova',
        role: 'Chief Technology Officer, VZ'
      },
      {
        type: 'text',
        heading: 'The Impact',
        content: 'The automations reclaimed over 10,000 human hours annually. Data entry errors were eliminated entirely, and operational velocity increased, allowing the company to scale its client base without needing a proportional increase in back-office headcount.'
      }
    ]
  }
];

export const getCaseBySlug = cache((slug: string): Case | undefined => {
  return casesData.find(c => c.slug === slug);
});

export const getAllCases = cache((): Case[] => {
  return casesData;
});

export const getNextCase = cache((currentSlug: string): Case | null => {
  const currentIndex = casesData.findIndex(c => c.slug === currentSlug);
  if (currentIndex === -1 || casesData.length <= 1) return null;
  const nextIndex = (currentIndex + 1) % casesData.length;
  return casesData[nextIndex];
});
