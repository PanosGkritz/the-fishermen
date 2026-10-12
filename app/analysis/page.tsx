
import { Suspense } from 'react'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import AnalysisArticles from './AnalysisArticles'
import type { Article, AnalysisCategory } from './AnalysisArticles'

type PageProps = {
  searchParams: Promise<{ category?: string }>
}

const validCategories: AnalysisCategory[] = [
  'teamAnalysis',
  'matchAnalysis',
  'dataPerformance',
]

const categoryTitles: Record<AnalysisCategory, string> = {
  teamAnalysis: 'Team Analysis',
  matchAnalysis: 'Match Analysis',
  dataPerformance: 'Data & Performance',
}

const nationalTeamSlug = 'i-nea-genia-poy-allazei-tin-ethniki'

const ofiArticle: Article = {
  _id: 'manual-ofi-analysis',
  _type: 'post',
  title: 'How OFI surprised Greece — and built a team Europe should watch',
  slug: 'ofi',
  excerpt: 'Team DNA · Pressing · Defensive structure · Recruitment',
  section: 'analysis',
  analysisCategory: 'teamAnalysis',
  publishedAt: '2026-10-09T12:00:00Z',
  featured: true,
}

const analysisArticlesQuery = `
  *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now() &&
    (
      section == "analysis" ||
      slug.current == "${nationalTeamSlug}"
    )
  ] | order(publishedAt desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    section,
    "analysisCategory": select(
      slug.current == "${nationalTeamSlug}" => "teamAnalysis",
      defined(analysisCategory) => analysisCategory,
      null
    ),
    publishedAt,
    featured,
    mainImage {
      asset,
      alt
    }
  }
`

async function AnalysisContent({
  category,
}: {
  category: AnalysisCategory | null
}) {
  let articles: Article[] = []

  try {
    articles = await client.fetch<Article[]>(analysisArticlesQuery)
  } catch (error) {
    console.error('Failed to load analysis articles from Sanity:', error)
  }

  const combinedArticles = [
    ofiArticle,
    ...articles.filter((article) => article.slug !== 'ofi'),
  ].sort(
    (a, b) =>
      new Date(b.publishedAt || 0).getTime() -
      new Date(a.publishedAt || 0).getTime(),
  )

  const visibleArticles = category
    ? combinedArticles.filter(
        (article) => article.analysisCategory === category,
      )
    : combinedArticles

  return (
    <AnalysisArticles
      articles={visibleArticles}
      category={category}
    />
  )
}

function AnalysisFallback() {
  return (
    <p className="py-12 text-sm text-[#9daab0]">
      Loading analysis articles...
    </p>
  )
}

const categoryLinks = [
  {
    href: '/analysis?category=teamAnalysis',
    label: 'TEAM ANALYSIS',
  },
  {
    href: '/analysis?category=matchAnalysis',
    label: 'MATCH ANALYSIS',
  },
  {
    href: '/analysis?category=dataPerformance',
    label: 'DATA & PERFORMANCE',
  },
]

async function AnalysisPageContent({ searchParams }: PageProps) {
  const params = await searchParams
  const requestedCategory = params.category

  const category =
    requestedCategory &&
    validCategories.includes(requestedCategory as AnalysisCategory)
      ? (requestedCategory as AnalysisCategory)
      : null

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <p className="mb-4 text-xs tracking-[0.3em] text-[#bdb5a5]">
          THE FISHERMEN / ANALYSIS
        </p>

        <h1 className="max-w-4xl font-serif text-5xl leading-tight md:text-7xl">
          {category ? categoryTitles[category] : 'Analysis'}
        </h1>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl text-base leading-7 text-[#9daab0] md:text-lg">
            {category === 'teamAnalysis'
              ? 'Μια πιο προσεκτική ματιά στην αγωνιστική ταυτότητα των ομάδων, την τακτική τους δομή και τις ιδέες που καθορίζουν τη συλλογική τους απόδοση.'
              : category === 'matchAnalysis'
                ? 'Ανάλυση αγώνων, καθοριστικών στιγμών και τακτικών επιλογών που διαμορφώνουν το αποτέλεσμα.'
                : category === 'dataPerformance'
                  ? 'Διερεύνηση της ποδοσφαιρικής απόδοσης μέσα από δεδομένα, στατιστικά στοιχεία και ουσιαστικά συμπεράσματα.'
                  : 'Η αγωνιστική ταυτότητα των ομάδων, η ανάλυση αγώνων και τα δεδομένα απόδοσης. Μια βαθύτερη ματιά στις λεπτομέρειες που διαμορφώνουν το ποδόσφαιρο.'}
          </p>

          {category && (
            <Link
              href="/analysis"
              className="inline-flex min-h-[52px] shrink-0 items-center justify-center self-start border border-[#294052] px-6 py-3 text-xs tracking-[0.18em] text-[#eee8da] transition-colors duration-300 hover:border-[#bdb5a5] hover:bg-[#102738] md:self-center"
            >
              Back to Analysis
            </Link>
          )}
        </div>

        {category && (
          <div className="mt-10 border-b border-[#294052]" />
        )}

        {!category && (
          <div className="mt-8 flex flex-wrap gap-4">
            {categoryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-[52px] items-center justify-center border border-[#eee8da] px-7 py-4 text-xs tracking-[0.12em] text-[#eee8da] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#071827] hover:shadow-lg hover:shadow-black/10"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="bg-[#f5f1e8] px-6 py-12 text-[#10202b] md:px-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <Suspense fallback={<AnalysisFallback />}>
            <AnalysisContent category={category} />
          </Suspense>
        </div>
      </section>
    </>
  )
}

export default function AnalysisPage({ searchParams }: PageProps) {
  return (
    <main className="min-h-screen bg-[#071827] text-[#eee8da]">
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
            <p className="text-sm text-[#9daab0]">
              Loading Analysis...
            </p>
          </div>
        }
      >
        <AnalysisPageContent searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
