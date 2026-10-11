
import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { scoutingReportBySlugQuery } from '@/sanity/lib/queries'

type ReportPageProps = {
  params: Promise<{
    slug: string
  }>
}

type RatingSet = {
  technical?: number
  tactical?: number
  physical?: number
  mental?: number
}

type Report = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  lastWatchedMatch?: string
  season?: string
  strengths?: string[]
  weaknesses?: string[]
  developmentAreas?: string[]
  roleFit?: string
  recommendation?: string
  ratings?: RatingSet
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

function formatDate(date?: string) {
  if (!date) return ''

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date))
}

function RatingCard({
  label,
  value,
}: {
  label: string
  value?: number
}) {
  if (typeof value !== 'number') return null

  const score = Math.min(10, Math.max(0, value))

  return (
    <div className="border border-[#294052] bg-[#0b2030] p-5 transition-colors duration-300 hover:border-[#526a78]">
      <p className="text-[10px] tracking-[0.15em] text-[#bdb5a5]">
        {label}
      </p>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-serif text-4xl text-[#eee8da]">
          {value}
        </span>
        <span className="text-xs text-[#9daab0]">/ 10</span>
      </div>

      <div
        className="mt-4 h-1 w-full bg-[#294052]"
        role="progressbar"
        aria-label={`${label} rating`}
        aria-valuemin={0}
        aria-valuemax={10}
        aria-valuenow={score}
      >
        <div
          className="h-full bg-[#bdb5a5] transition-[width] duration-500"
          style={{
            width: `${score * 10}%`,
          }}
        />
      </div>
    </div>
  )
}

function DetailList({
  title,
  items,
}: {
  title: string
  items?: string[]
}) {
  if (!items?.length) return null

  return (
    <section className="border-t border-[#294052] py-8">
      <h2 className="font-serif text-2xl text-[#eee8da]">
        {title}
      </h2>

      <ul className="mt-5 space-y-3">
        {items.map((item, index) => (
          <li
            key={`${title}-${index}`}
            className="flex gap-3 text-sm leading-7 text-[#c6cdd0]"
          >
            <span
              className="text-[#bdb5a5]"
              aria-hidden="true"
            >
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

async function ReportContent({ slug }: { slug: string }) {
  const report: Report | null = await client.fetch(
    scoutingReportBySlugQuery,
    { slug },
  )

  if (!report) {
    notFound()
  }

  const ratings = report.ratings

  const hasRatings =
    typeof ratings?.technical === 'number' ||
    typeof ratings?.tactical === 'number' ||
    typeof ratings?.physical === 'number' ||
    typeof ratings?.mental === 'number'

  return (
    <article>
      <Link
        href="/scouting/reports"
        className="inline-flex items-center gap-3 border border-[#294052] px-4 py-3 text-[10px] tracking-[0.18em] text-[#bdb5a5] transition-colors duration-300 hover:border-[#bdb5a5] hover:text-[#eee8da] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bdb5a5]"
      >
        ← ALL SCOUTING REPORTS
      </Link>

      <header className="mx-auto max-w-4xl py-10 md:py-16">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-7 bg-[#bdb5a5]" />
          <p className="text-xs tracking-[0.2em] text-[#bdb5a5]">
            SCOUTING REPORT
            {report.publishedAt
              ? ` / ${formatDate(report.publishedAt).toUpperCase()}`
              : ''}
          </p>
        </div>

        <h1 className="font-serif text-4xl leading-tight tracking-tight md:text-6xl">
          {report.title}
          <span className="text-[#bdb5a5]">.</span>
        </h1>

        {report.excerpt && (
          <p className="mt-6 text-lg leading-8 text-[#c2cbd0]">
            {report.excerpt}
          </p>
        )}

        {report.player?.name && (
          <div className="mt-8 border-l-2 border-[#bdb5a5] bg-[#0b2030] py-5 pl-5 pr-4">
            <p className="text-[10px] tracking-[0.2em] text-[#bdb5a5]">
              PLAYER
            </p>

            {report.player.slug ? (
              <Link
                href={`/scouting/players/${report.player.slug}`}
                className="mt-2 inline-block text-lg text-[#eee8da] transition-colors hover:text-[#bdb5a5]"
              >
                {report.player.name} →
              </Link>
            ) : (
              <p className="mt-2 text-lg text-[#eee8da]">
                {report.player.name}
              </p>
            )}

            <p className="mt-2 text-sm leading-6 text-[#c2cbd0]">
              {[
                report.player.primaryPosition,
                report.player.club,
                report.player.league,
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
        )}
      </header>

      {report.mainImage?.asset?._ref && (
        <div className="mb-12 overflow-hidden border border-[#294052] bg-[#102536]">
          <img
            src={urlFor(report.mainImage)
              .width(1600)
              .fit('max')
              .auto('format')
              .url()}
            alt={report.mainImage.alt || report.title}
            className="max-h-[680px] w-full object-cover"
          />
        </div>
      )}

      {(report.lastWatchedMatch || report.season) && (
        <div className="mb-12 grid gap-6 border-y border-[#294052] py-6 sm:grid-cols-2">
          {report.lastWatchedMatch && (
            <div>
              <p className="text-[10px] tracking-[0.15em] text-[#bdb5a5]">
                LAST WATCHED MATCH
              </p>
              <p className="mt-2 text-sm leading-6 text-[#eee8da]">
                {report.lastWatchedMatch}
              </p>
            </div>
          )}

          {report.season && (
            <div>
              <p className="text-[10px] tracking-[0.15em] text-[#bdb5a5]">
                SEASON
              </p>
              <p className="mt-2 text-sm text-[#eee8da]">
                {report.season}
              </p>
            </div>
          )}
        </div>
      )}

      {hasRatings && (
        <section className="mb-12">
          <p className="mb-3 text-[10px] tracking-[0.2em] text-[#bdb5a5]">
            TECHNICAL EVALUATION
          </p>

          <h2 className="mb-6 font-serif text-3xl text-[#eee8da]">
            Performance Ratings
            <span className="text-[#bdb5a5]">.</span>
          </h2>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <RatingCard
              label="TECHNICAL"
              value={ratings?.technical}
            />
            <RatingCard
              label="TACTICAL"
              value={ratings?.tactical}
            />
            <RatingCard
              label="PHYSICAL"
              value={ratings?.physical}
            />
            <RatingCard
              label="MENTAL"
              value={ratings?.mental}
            />
          </div>
        </section>
      )}

      <div className="grid gap-x-12 md:grid-cols-2">
        <DetailList title="Strengths" items={report.strengths} />
        <DetailList title="Weaknesses" items={report.weaknesses} />
        <DetailList
          title="Development Areas"
          items={report.developmentAreas}
        />
      </div>

      {report.roleFit && (
        <section className="border-t border-[#294052] py-8">
          <h2 className="font-serif text-2xl text-[#eee8da]">
            Role Fit
          </h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#c6cdd0]">
            {report.roleFit}
          </p>
        </section>
      )}

      {report.recommendation && (
        <section className="border-y border-[#294052] py-8">
          <h2 className="font-serif text-2xl text-[#eee8da]">
            Recommendation
          </h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#c6cdd0]">
            {report.recommendation}
          </p>
        </section>
      )}

      {report.videoUrl && (
        <section className="border-b border-[#294052] py-8">
          <h2 className="font-serif text-2xl text-[#eee8da]">
            Video Analysis
          </h2>
          <a
            href={report.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-[44px] items-center gap-3 border border-[#526a78] px-5 py-3 text-[10px] tracking-[0.2em] text-[#eee8da] transition-colors duration-300 hover:border-[#eee8da] hover:bg-[#eee8da] hover:text-[#071827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bdb5a5]"
          >
            WATCH VIDEO <span aria-hidden="true">↗</span>
          </a>
        </section>
      )}

      {report.body && report.body.length > 0 && (
        <section className="prose prose-invert prose-headings:font-serif prose-headings:font-normal prose-headings:text-[#eee8da] prose-p:leading-8 prose-p:text-[#c6cdd0] prose-strong:text-[#eee8da] prose-a:text-[#bdb5a5] mt-12 max-w-none">
          <PortableText value={report.body} />
        </section>
      )}

      {!hasRatings &&
        !report.strengths?.length &&
        !report.weaknesses?.length &&
        !report.developmentAreas?.length &&
        !report.roleFit &&
        !report.recommendation &&
        !report.body?.length && (
          <p className="border-t border-[#294052] py-8 text-sm leading-6 text-[#c2cbd0]">
            The detailed evaluation has not been added yet.
          </p>
        )}

      <div className="mt-16 border-t border-[#294052] pt-8">
        <Link
          href="/scouting/reports"
          className="inline-flex items-center gap-3 text-[10px] tracking-[0.18em] text-[#bdb5a5] transition-colors hover:text-[#eee8da]"
        >
          ← BACK TO SCOUTING REPORTS
        </Link>
      </div>
    </article>
  )
}

async function ScoutingReportPageContent({
  params,
}: ReportPageProps) {
  const { slug } = await params

  return <ReportContent slug={slug} />
}

export default function ScoutingReportPage({
  params,
}: ReportPageProps) {
  return (
    <main className="min-h-screen bg-[#071827] text-[#eee8da]">
      <section className="mx-auto max-w-5xl px-6 py-10 md:px-10 md:py-16">
        <Suspense
          fallback={
            <p className="py-12 text-sm text-[#9daab0]">
              Loading scouting report...
            </p>
          }
        >
          <ScoutingReportPageContent params={params} />
        </Suspense>
      </section>
    </main>
  )
}
