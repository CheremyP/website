import { notFound } from 'next/navigation';
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer/footer";
import { getCaseBySlug, getAllCases } from '@/lib/cases';
import { CaseHero, BlockRenderer } from '@/components/blocks/case';
import styles from '@/components/blocks/case/style.module.scss';
import Link from 'next/link';

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
    title: `${caseData.title} | Artfcl Work`,
    description: caseData.summary,
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
            <BlockRenderer key={i} block={block} index={i} />
          ))}
        </div>
      </article>

      <Footer />
    </main>
  );
}
