
import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { playerAnalysisBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

type AnalysisPageProps = {
  params: Promise<{
    slug: string
  }>
}

type AnalysisData = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  analysisType?: string
  publishedAt?: string
  videoUrl?: string
  mainImage?: {
    asset?: {
      _ref?: string
    }
    alt?: string
  }
  body?: any[]
  player?: {
    name?: string
    slug?: string
    club?: string
    league?: string
    primaryPosition?: string
    photo?: {
      asset?: {
        _ref?: string
      }
    }
  }
}

const typeLabels: Record<string, string> = {
  playingStyle: 'Playing Style',
  tactical: 'Tactical Analysis',
  technical: 'Technical Analysis',
  matchBased: 'Match Analysis',
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null

      return (
        <figure className="my-8">
          <img
            src={urlFor(value)
              .width(1200)
              .fit('max')
              .auto('format')
              .url()}
            alt={value.alt || 'Player analysis image'}
            loading="lazy"
            className="h-auto w-full rounded-sm"
          />

          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-[#9daab0]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

async function PlayerAnalysisContent({ slug }: { slug: string }) {
  const analysis: AnalysisData | null = await client.fetch(
    playerAnalysisBySlugQuery,
    { slug },
  )

  if (!analysis) {
    notFound()
  }

  return (
    <article>
      <Link
        href="/scouting/player-analysis"
        className="inline-block text-xs uppercase tracking-[0.2em] text-[#bdb5a5] transition hover:text-[#eee8da]"
      >
        ← All Player Analyses
      </Link>

      <header className="mx-auto max-w-4xl py-10 md:py-16">
        <p className="mb-5 text-xs uppercase tracking-[0.25em] text-[#bdb5a5]">
          {typeLabels[analysis.analysisType || ''] || 'Player Analysis'}
          {analysis.publishedAt && (
            <>
              {' / '}
              {new Date(analysis.publishedAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </>
          )}
        </p>

        <h1 className="text-3xl font-semibold uppercase leading-tight tracking-tight md:text-5xl">
          {analysis.title}
        </h1>

        {analysis.excerpt && (
          <p className="mt-6 text-lg leading-8 text-[#9daab0]">
            {analysis.excerpt}
          </p>
        )}

        {analysis.player?.name && (
          <div className="mt-8 border-l-2 border-[#bdb5a5] pl-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#71818b]">
              Player
            </p>

            {analysis.player.slug ? (
              <Link
                href={`/scouting/players/${analysis.player.slug}`}
                className="mt-2 inline-block text-base transition hover:text-[#bdb5a5]"
              >
                {analysis.player.name} →
              </Link>
            ) : (
              <p className="mt-2 text-base">{analysis.player.name}</p>
            )}

            <p className="mt-1 text-sm text-[#9daab0]">
              {[analysis.player.primaryPosition, analysis.player.club]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
        )}
      </header>

      {analysis.mainImage?.asset?._ref && (
        <div className="mb-12 overflow-hidden border border-[#294052]">
          <img
            src={urlFor(analysis.mainImage)
              .width(1600)
              .fit('max')
              .auto('format')
              .url()}
            alt={analysis.mainImage.alt || analysis.title}
            loading="eager"
            className="max-h-[680px] w-full object-cover"
          />
        </div>
      )}

      {analysis.videoUrl && (
        <div className="mb-12 border border-[#294052] p-6 md:p-8">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#bdb5a5]">
            Video Analysis
          </p>
          <a
            href={analysis.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm transition hover:text-[#bdb5a5]"
          >
            Watch video analysis <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}

      {analysis.body && analysis.body.length > 0 ? (
      <div className="max-w-none text-[17px] leading-8 text-[#c6cdd0] [&_p]:mb-7 [&_p]:text-[17px] [&_p]:leading-8 [&_h2]:mb-5 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:uppercase [&_h3]:mb-4 [&_h3]:mt-9 [&_h3]:text-xl [&_h3]:font-semibold [&_strong]:text-[#eee8da] [&_a]:text-[#bdb5a5] [&_figure]:my-12 [&_img]:block [&_img]:h-auto [&_img]:w-full">
          <PortableText
            value={analysis.body}
            components={portableTextComponents}
          />
        </div>
      ) : (
        <p className="border-t border-[#294052] py-8 text-sm text-[#9daab0]">
          The full analysis will be available here once its content is
          published.
        </p>
      )}

      <div className="mt-16 border-t border-[#294052] pt-8">
        <Link
          href="/scouting/player-analysis"
          className="text-xs uppercase tracking-[0.2em] text-[#bdb5a5] transition hover:text-[#eee8da]"
        >
          ← Back to Player Analysis
        </Link>
      </div>
    </article>
  )
}

async function PlayerAnalysisPageContent({ params }: AnalysisPageProps) {
  const { slug } = await params

  return <PlayerAnalysisContent slug={slug} />
}

function AnalysisFallback() {
  return (
    <p className="py-12 text-sm text-[#9daab0]">
      Loading analysis...
    </p>
  )
}

export default function PlayerAnalysisDetailPage({
  params,
}: AnalysisPageProps) {
  return (
    <main className="min-h-screen bg-[#071827] text-[#eee8da]">
      <section className="mx-auto max-w-5xl px-6 py-10 md:px-10 md:py-16">
        <Suspense fallback={<AnalysisFallback />}>
          <PlayerAnalysisPageContent params={params} />
        </Suspense>
      </section>
    </main>
  )
}
