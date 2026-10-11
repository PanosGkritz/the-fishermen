
import Link from 'next/link'
import { Suspense } from 'react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

type Article = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  featured?: boolean
  mainImage?: {
    asset?: { _ref?: string }
    alt?: string
  }
}

const recruitmentAnalysisQuery = `
  *[
    _type == "post" &&
    section == "recruitment" &&
    recruitmentCategory == "recruitmentAnalysis" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] | order(featured desc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    featured,
    mainImage {
      ...,
      alt
    }
  }
`

function formatDate(date?: string) {
  if (!date) return ''

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date)).toUpperCase()
}

function getImageUrl(article: Article) {
  if (!article.mainImage?.asset?._ref) return null

  return urlFor(article.mainImage)
    .width(1200)
    .height(750)
    .fit('crop')
    .auto('format')
    .url()
}

function ArticleCard({ article }: { article: Article }) {
  const imageUrl = getImageUrl(article)

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-[#d4cec2] bg-[#faf8f2] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-[16/10] overflow-hidden bg-[#0c2234]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={article.mainImage?.alt || article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-end p-6">
            <p className="text-[10px] tracking-[0.18em] text-[#7b8589]">
              THE FISHERMEN
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] tracking-[0.16em] text-[#7b8589]">
            RECRUITMENT ANALYSIS
          </p>
          <time className="text-[10px] text-[#8a9498]">
            {formatDate(article.publishedAt)}
          </time>
        </div>

        <h3 className="mt-5 font-serif text-2xl leading-tight text-[#10202b] transition-colors group-hover:text-[#68757b]">
          {article.title}
        </h3>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#68757b]">
          {article.excerpt ||
            'Recruitment decisions, tactical fit and squad-building insights.'}
        </p>

        <p className="mt-auto pt-7 text-[10px] tracking-[0.15em] text-[#526068]">
          READ ARTICLE →
        </p>
      </div>
    </Link>
  )
}

async function RecruitmentContent() {
  let articles: Article[] = []

  try {
    articles = await client.fetch(recruitmentAnalysisQuery)
  } catch (error) {
    console.error('Failed to load Recruitment Analysis:', error)

    return (
      <section className="bg-[#f5f1e8] px-6 py-16 text-[#10202b]">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm leading-6 text-[#68757b]">
            Recruitment articles could not be loaded. Please try again later.
          </p>
        </div>
      </section>
    )
  }

  const featuredArticle =
    articles.find((article) => article.featured) || articles[0]

  const latestArticles = articles.filter(
    (article) => article._id !== featuredArticle?._id,
  )

  const featuredImage = featuredArticle
    ? getImageUrl(featuredArticle)
    : null

  return (
    <>
      <section className="bg-[#f5f1e8] px-6 py-16 text-[#10202b] md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-[#cfc8ba] pb-5">
            <div>
              <p className="mb-3 text-[10px] tracking-[0.2em] text-[#7b8589]">
                THE MAIN EVENT
              </p>
              <h2 className="font-serif text-3xl md:text-4xl">
                Featured Recruitment Analysis
              </h2>
            </div>

            <span className="text-[10px] tracking-[0.15em] text-[#526068]">
              RECRUITMENT
            </span>
          </div>

          {featuredArticle ? (
            <Link
              href={`/articles/${featuredArticle.slug}`}
              className="group grid overflow-hidden rounded-xl border border-[#d4cec2] bg-[#faf8f2] transition-all duration-300 hover:shadow-xl md:grid-cols-2"
            >
              <div className="min-h-[280px] overflow-hidden bg-[#0c2234] md:min-h-[430px]">
                {featuredImage ? (
                  <img
                    src={featuredImage}
                    alt={
                      featuredArticle.mainImage?.alt ||
                      featuredArticle.title
                    }
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full min-h-[280px] items-end p-8">
                    <span className="text-xs tracking-[0.2em] text-[#bdb5a5]">
                      THE FISHERMEN
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center p-7 md:p-10 lg:p-14">
                <p className="text-[10px] tracking-[0.2em] text-[#7b8589]">
                  FEATURED RECRUITMENT ANALYSIS
                </p>

                <h3 className="mt-6 font-serif text-3xl leading-tight md:text-4xl lg:text-5xl">
                  {featuredArticle.title}
                </h3>

                <p className="mt-5 text-sm leading-7 text-[#68757b]">
                  {featuredArticle.excerpt ||
                    'A closer look at recruitment strategy, player fit and building a stronger squad.'}
                </p>

                <p className="mt-8 text-[10px] tracking-[0.15em] text-[#526068]">
                  READ ANALYSIS →
                </p>
              </div>
            </Link>
          ) : (
            <p className="py-10 text-sm leading-6 text-[#68757b]">
              No Recruitment Analysis articles yet. Publish an article in
              Sanity and select Recruitment Analysis as its category.
            </p>
          )}
        </div>
      </section>

      <section className="bg-[#f5f1e8] px-6 pb-20 pt-8 text-[#10202b] md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-[#cfc8ba] pb-5">
            <div>
              <p className="mb-3 text-[10px] tracking-[0.2em] text-[#7b8589]">
                THE LATEST
              </p>
              <h2 className="font-serif text-3xl md:text-4xl">
                Latest Recruitment Insights
              </h2>
            </div>

            <span className="text-[10px] tracking-[0.15em] text-[#526068]">
              NEWEST FIRST
            </span>
          </div>

          {latestArticles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <p className="py-6 text-sm leading-6 text-[#68757b]">
              More Recruitment Analysis articles will appear here as they
              are published.
            </p>
          )}
        </div>
      </section>

      <section className="bg-[#0c2234] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs tracking-[0.25em] text-[#bdb5a5]">
            RECRUITMENT PHILOSOPHY
          </p>

          <h2 className="font-serif text-4xl leading-tight md:text-5xl">
            Fit matters more than fame.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#aeb9bd]">
            The best recruitment decisions connect player profile, tactical
            role, team identity and long-term potential.
          </p>
        </div>
      </section>
    </>
  )
}

function RecruitmentFallback() {
  return (
    <section className="bg-[#f5f1e8] px-6 py-16 text-[#10202b]">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm text-[#68757b]">
          Loading Recruitment Analysis...
        </p>
      </div>
    </section>
  )
}

export default function RecruitmentPage() {
  return (
    <main className="min-h-screen bg-[#071827] text-[#eee8da]">
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <p className="mb-5 text-xs tracking-[0.25em] text-[#bdb5a5]">
          THE FISHERMEN / RECRUITMENT
        </p>

        <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl">
          Recruitment Analysis
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-7 text-[#aeb9bd]">
          Recruitment decisions built around tactical fit, squad needs and
          a clear football identity.
        </p>

        <div className="mt-10">
          <Link
            href="/recruitment/market-opportunities"
            className="inline-flex min-h-[52px] items-center justify-center border border-[#eee8da] bg-transparent px-6 py-3 text-xs tracking-[0.12em] text-[#eee8da] transition-colors duration-300 hover:bg-[#eee8da] hover:text-[#071827]"
          >
            MARKET OPPORTUNITIES →
          </Link>
        </div>
      </section>

      <Suspense fallback={<RecruitmentFallback />}>
        <RecruitmentContent />
      </Suspense>
    </main>
  )
}
