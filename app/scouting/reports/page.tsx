import { Suspense } from 'react'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

type ScoutingReport = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  mainImage?: {
    asset?: {
      _ref?: string
    }
    alt?: string
  }
  player?: {
    name?: string
    slug?: string
    club?: string
    primaryPosition?: string
  }
}

function formatDate(date?: string) {
  if (!date) return ''

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) return ''

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(parsedDate)
    .toUpperCase()
}

async function getReports(): Promise<ScoutingReport[]> {
  const query = `*[
    _type == "scoutingReport" &&
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
    },
    "player": player-> {
      name,
      "slug": slug.current,
      club,
      primaryPosition
    }
  }`

  return client.fetch<ScoutingReport[]>(query)
}

async function ReportsContent() {
  let reports: ScoutingReport[] = []
  let hasError = false

  try {
    reports = await getReports()
  } catch (error) {
    console.error('Failed to load scouting reports:', error)
    hasError = true
  }

  if (hasError) {
    return (
      <div className="border border-[#294052] px-6 py-14 text-center">
        <h2 className="font-serif text-2xl">
          Unable to load scouting reports
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#9daab0]">
          Please try again later. If the problem persists, check the Sanity
          connection and published scouting reports.
        </p>
      </div>
    )
  }

  if (reports.length === 0) {
    return (
      <div className="border border-[#294052] px-6 py-14 text-center">
        <h2 className="font-serif text-2xl">
          No scouting reports yet
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#9daab0]">
          Published scouting reports will appear here. Create a report in
          Sanity Studio, add a slug and publication date, and publish it.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <Link
          key={report._id}
          href={`/scouting/reports/${report.slug}`}
          className="group flex flex-col overflow-hidden border border-[#294052] transition-colors duration-300 hover:border-white"
        >
          <div className="aspect-[16/10] overflow-hidden bg-[#102738]">
            {report.mainImage?.asset?._ref ? (
              <img
                src={urlFor(report.mainImage)
                  .width(900)
                  .height(560)
                  .fit('crop')
                  .auto('format')
                  .url()}
                alt={report.mainImage.alt || report.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-end p-6">
                <span className="text-xs tracking-[0.2em] text-[#bdb5a5]">
                  THE FISHERMEN
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[10px] tracking-[0.18em] text-[#bdb5a5]">
                SCOUTING REPORT
              </span>

              {report.publishedAt && (
                <time
                  dateTime={report.publishedAt}
                  className="text-[10px] text-[#9daab0]"
                >
                  {formatDate(report.publishedAt)}
                </time>
              )}
            </div>

            <h2 className="mt-5 font-serif text-2xl leading-tight transition-colors group-hover:text-[#bdb5a5]">
              {report.title}
            </h2>

            {report.player?.name && (
              <p className="mt-3 text-xs text-[#9daab0]">
                {report.player.name}
                {report.player.club ? ` · ${report.player.club}` : ''}
              </p>
            )}

            <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#9daab0]">
              {report.excerpt ||
                'Read the full scouting report for the player evaluation.'}
            </p>

            <span className="mt-auto pt-7 text-[10px] tracking-[0.15em] text-[#bdb5a5]">
              READ FULL REPORT →
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

function ReportsFallback() {
  return (
    <p className="py-12 text-sm text-[#9daab0]">
      Loading scouting reports...
    </p>
  )
}

export default function ScoutingReportsPage() {
  return (
    <main className="min-h-screen bg-[#071827] text-[#eee8da]">
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <p className="mb-4 text-xs tracking-[0.3em] text-[#bdb5a5]">
          THE FISHERMEN / SCOUTING
        </p>

        <h1 className="font-serif text-5xl leading-tight md:text-7xl">
          Scouting Reports
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-7 text-[#9daab0] md:text-lg">
          In-depth player evaluations, technical observations and scouting
          insights.
        </p>

        <div className="mt-10 border-b border-[#294052]" />
      </section>

      <section className="bg-[#071827] px-6 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <Suspense fallback={<ReportsFallback />}>
            <ReportsContent />
          </Suspense>
        </div>
      </section>
    </main>
  )
}