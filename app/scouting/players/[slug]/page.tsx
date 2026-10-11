import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { playerProfileBySlugQuery } from '@/sanity/lib/queries'

type PlayerPageProps = {
  params: Promise<{ slug: string }>
}

async function PlayerContent({ slug }: { slug: string }) {
  const player = await client.fetch(playerProfileBySlugQuery, { slug })

  if (!player) notFound()

  const photoUrl = player.photo
    ? urlFor(player.photo).width(1000).height(1200).fit('crop').url()
    : null

  const reports = player.scoutingReports ?? []

  return (
    <main className="min-h-screen bg-[#071827] text-[#eee8da]">
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20">
        <Link
          href="/scouting/players"
          className="mb-10 inline-flex items-center gap-3 border border-[#294052] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[#c2cbd0] transition-colors duration-300 hover:border-[#eee8da] hover:text-[#eee8da] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eee8da]"
        >
          <span aria-hidden="true">←</span>
          All Player Profiles
        </Link>

        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[#bdb5a5]" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#bdb5a5]">
            THE FISHERMEN / SCOUTING
          </p>
        </div>

        <div className="grid gap-10 border-b border-[#294052] pb-12 md:grid-cols-2 md:gap-12">
          <div className="overflow-hidden border border-[#294052] bg-[#102536]">
            {photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photoUrl}
                alt={player.name}
                className="aspect-[4/5] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center text-xs uppercase tracking-[0.2em] text-[#c2cbd0]">
                Player Image
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.22em] text-[#bdb5a5]">
              {player.primaryPosition || 'Player'}
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl md:leading-[1.05]">
              {player.name}
              <span className="text-[#bdb5a5]">.</span>
            </h1>

            <p className="mt-4 text-base leading-7 text-[#c2cbd0] md:text-lg">
              {[player.club, player.league].filter(Boolean).join(' · ') ||
                'Club information unavailable'}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-7 border-y border-[#294052] py-7">
              <Detail label="Nationality" value={player.nationality} />
              <Detail label="Preferred Foot" value={player.preferredFoot} />
              <Detail
                label="Height"
                value={player.heightCm ? `${player.heightCm} cm` : undefined}
              />
              <Detail label="Date of Birth" value={player.dateOfBirth} />
              <Detail
                label="Secondary Positions"
                value={player.secondaryPositions?.join(', ')}
              />
              <Detail label="Last Scouted" value={player.lastScoutedAt} />
            </div>

            {player.profileNotes && (
              <p className="mt-6 whitespace-pre-line text-sm leading-7 text-[#c2cbd0]">
                {player.profileNotes}
              </p>
            )}

            <div className="mt-8 flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-[#bdb5a5]" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c2cbd0]">
                {reports.length} published{' '}
                {reports.length === 1 ? 'report' : 'reports'}
              </p>
            </div>
          </div>
        </div>

        <section className="pt-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#bdb5a5]" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#bdb5a5]">
              Scouting Department
            </p>
          </div>

          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Scouting Reports
              <span className="text-[#bdb5a5]">.</span>
            </h2>
            {reports.length > 0 && (
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#c2cbd0]">
                {String(reports.length).padStart(2, '0')} Reports
              </p>
            )}
          </div>

          {reports.length === 0 ? (
            <p className="mt-6 border border-[#294052] bg-[#0b2030] p-6 text-sm leading-7 text-[#c2cbd0]">
              No published scouting reports available.
            </p>
          ) : (
            <div className="mt-8 space-y-6">
              {reports.map((report: any, index: number) => (
                <article
                  key={report._id}
                  className="border border-[#294052] bg-[#0b2030] p-6 transition-colors duration-300 hover:border-[#526a78] md:p-9"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#294052] pb-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#c2cbd0]">
                      Report {String(index + 1).padStart(2, '0')}
                    </p>

                    {report.publishedAt && (
                      <p className="text-[10px] uppercase tracking-[0.16em] text-[#bdb5a5]">
                        {new Date(report.publishedAt).toLocaleDateString(
                          'en-GB',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            timeZone: 'UTC',
                          },
                        )}
                      </p>
                    )}
                  </div>

                  {report.slug ? (
                    <Link
                      href={`/scouting/reports/${report.slug}`}
                      className="group mt-6 inline-flex min-h-[48px] max-w-full items-center justify-between gap-6 border border-[#526a78] bg-[#102536] px-5 py-3 text-base font-medium text-[#eee8da] transition-all duration-300 hover:border-[#eee8da] hover:bg-[#eee8da] hover:text-[#071827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bdb5a5]"
                    >
                      <span className="flex min-w-0 flex-col gap-1">
                        <span>{report.title}</span>
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#c2cbd0] transition-colors group-hover:text-[#526a78]">
                          View full scouting report
                        </span>
                      </span>
                      <span aria-hidden="true" className="shrink-0 text-lg">
                        ↗
                      </span>
                    </Link>
                  ) : (
                    <h3 className="mt-6 text-2xl font-medium tracking-tight">
                      {report.title}
                    </h3>
                  )}

                  {report.excerpt && (
                    <p className="mt-5 max-w-4xl text-sm leading-7 text-[#c2cbd0]">
                      {report.excerpt}
                    </p>
                  )}

                  {report.lastWatchedMatch && (
                    <p className="mt-5 border-l border-[#526a78] pl-4 text-sm leading-6 text-[#c2cbd0]">
                      <span className="mr-2 text-[10px] uppercase tracking-[0.16em] text-[#bdb5a5]">
                        Match observed
                      </span>
                      {report.lastWatchedMatch}
                    </p>
                  )}

                  <div className="mt-8 border-y border-[#294052] py-6">
                    <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-[#bdb5a5]">
                      Performance Assessment
                    </p>
                    <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                      <Rating
                        label="Technical"
                        value={report.ratings?.technical}
                      />
                      <Rating
                        label="Tactical"
                        value={report.ratings?.tactical}
                      />
                      <Rating
                        label="Physical"
                        value={report.ratings?.physical}
                      />
                      <Rating
                        label="Mental"
                        value={report.ratings?.mental}
                      />
                    </div>
                  </div>

                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <TextList title="Strengths" items={report.strengths} />
                    <TextList title="Weaknesses" items={report.weaknesses} />
                  </div>

                  <div className="mt-8">
                    <TextList
                      title="Development Areas"
                      items={report.developmentAreas}
                    />
                  </div>

                  {report.roleFit && (
                    <TextBlock
                      title="Tactical Role & Suitability"
                      text={report.roleFit}
                    />
                  )}

                  {report.recommendation && (
                    <TextBlock
                      title="Scouting Recommendation"
                      text={report.recommendation}
                    />
                  )}

                  {report.body && (
                    <div className="prose prose-invert mt-8 max-w-none border-t border-[#294052] pt-8 prose-headings:font-semibold prose-headings:text-[#eee8da] prose-p:text-[#c2cbd0] prose-strong:text-[#eee8da] prose-li:text-[#c2cbd0] prose-a:text-[#bdb5a5] prose-a:underline-offset-4 hover:prose-a:text-[#eee8da]">
                      <PortableText value={report.body} />
                    </div>
                  )}

                  {report.videoUrl && (
                    <a
                      href={report.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex min-h-[44px] items-center gap-3 border border-[#526a78] px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-[#eee8da] transition-colors duration-300 hover:border-[#eee8da] hover:bg-[#eee8da] hover:text-[#071827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bdb5a5]"
                    >
                      Watch Video <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) return null

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.18em] text-[#bdb5a5]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-[#eee8da]">{value}</p>
    </div>
  )
}

function Rating({ label, value }: { label: string; value?: number }) {
  if (value == null) return null

  const score = Math.max(0, Math.min(10, value))

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4 text-xs">
        <span className="uppercase tracking-[0.15em] text-[#c2cbd0]">
          {label}
        </span>
        <span className="font-medium tabular-nums text-[#eee8da]">
          {value}
          <span className="text-[#9daab0]"> / 10</span>
        </span>
      </div>

      <div
        className="h-1.5 overflow-hidden bg-[#294052]"
        role="progressbar"
        aria-label={`${label} rating`}
        aria-valuemin={0}
        aria-valuemax={10}
        aria-valuenow={score}
      >
        <div
          className="h-full bg-[#bdb5a5] transition-[width] duration-500"
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  )
}

function TextList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null

  return (
    <div className="border-t border-[#294052] pt-5">
      <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#bdb5a5]">
        {title}
      </h4>

      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="flex gap-3 text-sm leading-7 text-[#eee8da]"
          >
            <span aria-hidden="true" className="shrink-0 text-[#bdb5a5]">
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TextBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-8 border-l-2 border-[#bdb5a5] bg-[#102536]/60 py-5 pl-5 pr-4">
      <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#bdb5a5]">
        {title}
      </h4>

      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#eee8da]">
        {text}
      </p>
    </div>
  )
}

async function PlayerPageContent({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <PlayerContent slug={slug} />
}

export default function PlayerPage({ params }: PlayerPageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#071827] px-6 py-20 text-[#c2cbd0]">
          Loading player profile...
        </main>
      }
    >
      <PlayerPageContent params={params} />
    </Suspense>
  )
}
