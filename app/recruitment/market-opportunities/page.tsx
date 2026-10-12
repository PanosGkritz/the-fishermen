
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
  mainImage?: {
    asset?: { _ref?: string }
    alt?: string
  }
}

const marketOpportunitiesQuery = `
  *[
    _type == "post" &&
    section == "recruitment" &&
    recruitmentCategory == "marketOpportunities" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
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

function MarketArticleCard({ article }: { article: Article }) {
  const imageUrl = article.mainImage?.asset?._ref
    ? urlFor(article.mainImage)
        .width(900)
        .height(600)
        .fit('crop')
        .auto('format')
        .url()
    : null

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
            <p className="text-[10px] tracking-[0.18em] text-[#bdb5a5]">
              MARKET OPPORTUNITIES
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] tracking-[0.16em] text-[#7b8589]">
            MARKET OPPORTUNITY
          </p>

          <time className="text-[10px] text-[#8a9498]">
            {formatDate(article.publishedAt)}
          </time>
        </div>

        <h2 className="mt-5 font-serif text-2xl leading-tight text-[#10202b] transition-colors group-hover:text-[#68757b]">
          {article.title}
        </h2>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#68757b]">
          {article.excerpt ||
            'Players to watch, undervalued talent and opportunities in the transfer market.'}
        </p>

        <p className="mt-auto pt-7 text-[10px] tracking-[0.15em] text-[#526068]">
          READ ARTICLE →
        </p>
      </div>
    </Link>
  )
}

async function MarketOpportunitiesContent() {
  let articles: Article[] = []

  try {
    articles = await client.fetch(marketOpportunitiesQuery)
  } catch (error) {
    console.error('Failed to load Market Opportunities:', error)

    return (
      <p className="py-10 text-sm leading-6 text-[#68757b]">
        Market Opportunities could not be loaded. Please try again later.
      </p>
    )
  }

  if (!articles.length) {
    return (
      <p className="py-10 text-sm leading-6 text-[#68757b]">
        No published Market Opportunities yet. Publish an article in Sanity,
        select Recruitment as the Website Section and Market Opportunities as
        the Recruitment Category.
      </p>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <MarketArticleCard key={article._id} article={article} />
      ))}
    </div>
  )
}

function MarketOpportunitiesFallback() {
  return (
    <p className="py-10 text-sm text-[#68757b]">
      Loading Market Opportunities...
    </p>
  )
}

export default function MarketOpportunitiesPage() {
  return (
    <main className="min-h-screen bg-[#071827] text-[#eee8da]">
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <p className="mb-5 text-xs tracking-[0.25em] text-[#bdb5a5]">
          THE FISHERMEN / RECRUITMENT
        </p>

        <h1 className="max-w-5xl font-serif text-5xl leading-[0.95] md:text-7xl">
          Market Opportunities
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-7 text-[#aeb9bd]">
          Ανακάλυψη υποτιμημένων ταλέντων, παικτών που περνούν απαρατήρητοι και
           περιπτώσεων που μπορούν να προσφέρουν περισσότερα από όσα εκτιμά η αγορά.
        </p>

        <div className="mt-10">
          <Link
            href="/recruitment"
            className="inline-flex min-h-[52px] items-center justify-center border border-[#eee8da] bg-transparent px-6 py-3 text-xs tracking-[0.12em] text-[#eee8da] transition-colors duration-300 hover:bg-[#eee8da] hover:text-[#071827]"
          >
            ← RECRUITMENT ANALYSIS
          </Link>
        </div>
      </section>

      <section className="bg-[#f5f1e8] px-6 py-16 text-[#10202b] md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 border-b border-[#cfc8ba] pb-5">
            <p className="mb-3 text-[10px] tracking-[0.2em] text-[#7b8589]">
              THE TRANSFER MARKET
            </p>

            <h2 className="font-serif text-3xl md:text-4xl">
              Players Worth Watching
            </h2>
          </div>

          <Suspense fallback={<MarketOpportunitiesFallback />}>
            <MarketOpportunitiesContent />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
