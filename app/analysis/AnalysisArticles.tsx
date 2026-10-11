
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

export type AnalysisCategory =
  | 'teamAnalysis'
  | 'matchAnalysis'
  | 'dataPerformance'

export type Article = {
  _id: string
  _type?: string
  title: string
  slug: string
  excerpt?: string
  section?: string
  analysisCategory?: string
  publishedAt?: string
  featured?: boolean
  mainImage?: {
    asset?: {
      _ref?: string
      _id?: string
    }
    alt?: string
  }
}

const categoryLabels: Record<AnalysisCategory, string> = {
  teamAnalysis: 'TEAM ANALYSIS',
  matchAnalysis: 'MATCH ANALYSIS',
  dataPerformance: 'DATA & PERFORMANCE',
}

function formatDate(date?: string) {
  if (!date) return ''

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(new Date(date))
    .toUpperCase()
}

function ArticleCard({ article }: { article: Article }) {
  const isOfi = article.slug === 'ofi'

  const imageUrl = isOfi
    ? '/OFI-1.jpg'
    : article.mainImage?.asset
      ? urlFor(article.mainImage).width(900).quality(85).url()
      : null

  const href = isOfi
    ? '/analysis/ofi'
    : `/articles/${article.slug}`

  const category = article.analysisCategory as
    | AnalysisCategory
    | undefined

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#d4cec2] bg-[#faf8f2] transition-transform duration-300 hover:-translate-y-1">
      <Link href={href} className="flex h-full flex-col">
        <div className="h-56 overflow-hidden bg-[#0c2234]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={
                isOfi
                  ? 'OFI celebrating with the trophy'
                  : article.mainImage?.alt || article.title
              }
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-end p-7">
              <p className="text-[10px] tracking-[0.18em] text-[#7b8589]">
                THE FISHERMEN
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[10px] tracking-[0.18em] text-[#7b8589]">
              {category ? categoryLabels[category] : 'ANALYSIS'}
            </p>

            {article.publishedAt && (
              <time
                dateTime={article.publishedAt}
                className="text-[10px] text-[#8a9498]"
              >
                {formatDate(article.publishedAt)}
              </time>
            )}
          </div>

          <h2 className="mt-6 font-serif text-2xl leading-tight transition-colors group-hover:text-[#68757b]">
            {article.title}
          </h2>

          <p className="mt-5 text-sm leading-6 text-[#68757b]">
            {article.excerpt ||
              'Football intelligence beyond the obvious.'}
          </p>

          <p className="mt-auto pt-7 text-[10px] tracking-[0.15em] text-[#526068]">
            READ ARTICLE →
          </p>
        </div>
      </Link>
    </article>
  )
}

export default function AnalysisArticles({
  articles,
  category,
}: {
  articles: Article[]
  category: AnalysisCategory | null
}) {
  if (articles.length === 0) {
    return (
      <div className="border border-[#d4cec2] px-6 py-16 text-center">
        <h2 className="font-serif text-3xl">
          More analysis coming soon
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#68757b]">
          New articles will appear here as soon as they are published.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 border-b border-[#d4cec2] pb-5">
        <h2 className="font-serif text-3xl md:text-4xl">
          {category ? categoryLabels[category] : 'Latest Analysis'}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  )
}
