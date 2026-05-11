import { notFound } from 'next/navigation';
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer/footer";
import { getCaseBySlug, getAllCases } from '@/lib/cases';
import { CaseHero, BlockRenderer } from '@/components/blocks/case';
import styles from '@/components/blocks/case/style.module.scss';

export async function generateStaticParams() {
  const cases = getAllCases();
  return cases.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const caseData = getCaseBySlug(resolvedParams.slug);
  
  if (!caseData) return { title: 'Case Not Found' };
  
  return {
    title: `${caseData.title} | ${caseData.client}`,
    description: caseData.summary,
    openGraph: {
      title: `${caseData.title} | ${caseData.client}`,
      description: caseData.summary,
      url: `https://www.artfcl.com/works/${caseData.slug}`,
      type: 'article',
      images: [
        {
          url: caseData.heroImage,
          width: 1200,
          height: 630,
          alt: `${caseData.client} Case Study - ${caseData.sector}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${caseData.title} | ${caseData.client}`,
      description: caseData.summary,
      images: [caseData.heroImage],
    },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const caseData = getCaseBySlug(resolvedParams.slug);
  
  if (!caseData) {
    notFound();
  }

  return (
    <main style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', color: '#141516' }}>
      <Header />
      
      <article>
        <CaseHero caseData={caseData} />
        
        <div className={styles.blocksContainer}>
          {caseData.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>
      </article>

      <Footer />
    </main>
  );
}
