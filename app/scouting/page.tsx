
import Link from 'next/link'
import { Suspense } from 'react'

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
    featuredPlayersQuery,
    playerAnalysisListQuery,
} from '@/sanity/lib/queries'

type Player = {
    _id: string
    name: string
    slug: string
    club?: string
    primaryPosition?: string
    photo?: {
        asset?: { _ref?: string }
    }
}

type Analysis = {
    _id: string
    title: string
    slug: string
    excerpt?: string
    analysisType?: string
    publishedAt?: string
    mainImage?: {
        asset?: { _ref?: string }
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

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(date)).toUpperCase()
}

function SectionHeading({
    eyebrow,
    title,
    href,
    linkLabel,
}: {
    eyebrow: string
    title: string
    href: string
    linkLabel: string
}) {
    return (
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-[#cfc8ba] pb-5">
            <div>
                <p className="mb-3 text-[10px] tracking-[0.2em] text-[#7b8589]">
                    {eyebrow}
                </p>

                <h2 className="font-serif text-3xl text-[#10202b] md:text-4xl">
                    {title}
                </h2>
            </div>

            <Link
                href={href}
                className="text-[10px] tracking-[0.15em] text-[#526068] transition hover:text-[#10202b]"
            >
                {linkLabel} →
            </Link>
        </div>
    )
}

function PlayerCard({ player }: { player: Player }) {
    return (
        <Link
            href={`/scouting/players/${player.slug}`}
            className="group overflow-hidden border border-[#d4cec2] bg-[#faf8f2] transition hover:-translate-y-1"
        >
            <div className="aspect-[4/3] overflow-hidden bg-[#102738]">
                {player.photo?.asset?._ref ? (
                    <img
                        src={urlFor(player.photo).width(800).height(600).fit('crop').auto('format').url()}
                        alt={player.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <span className="font-serif text-3xl text-[#bdb5a5]">
                            {player.name}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-6">
                <p className="text-[10px] tracking-[0.18em] text-[#7b8589]">
                    PLAYER PROFILE
                </p>

                <h3 className="mt-4 font-serif text-2xl text-[#10202b] transition group-hover:text-[#68757b]">
                    {player.name}
                </h3>

                <p className="mt-2 text-sm text-[#68757b]">
                    {[player.primaryPosition, player.club]
                        .filter(Boolean)
                        .join(' · ') || 'Player profile'}
                </p>

                <p className="mt-6 text-[10px] tracking-[0.15em] text-[#526068]">
                    VIEW PROFILE →
                </p>
            </div>
        </Link>
    )
}

function ContentCard({
    title,
    slug,
    excerpt,
    publishedAt,
    image,
    playerName,
    href,
    label,
}: {
    title: string
    slug: string
    excerpt?: string
    publishedAt?: string
    image?: { asset?: { _ref?: string }; alt?: string }
    playerName?: string
    href: string
    label: string
}) {
    return (
        <Link
            href={`${href}/${slug}`}
            className="group flex flex-col overflow-hidden border border-[#d4cec2] bg-[#faf8f2] transition hover:-translate-y-1"
        >
            <div className="aspect-[16/10] overflow-hidden bg-[#102738]">
                {image?.asset?._ref ? (
                    <img
                        src={urlFor(image).width(900).height(560).fit('crop').auto('format').url()}
                        alt={image.alt || title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-end p-6">
                        <span className="text-[10px] tracking-[0.18em] text-[#bdb5a5]">
                            THE FISHERMEN
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[10px] tracking-[0.16em] text-[#7b8589]">
                        {label}
                    </span>

                    <time className="text-[10px] text-[#8a9498]">
                        {formatDate(publishedAt)}
                    </time>
                </div>

                <h3 className="mt-5 font-serif text-2xl leading-tight text-[#10202b] transition group-hover:text-[#68757b]">
                    {title}
                </h3>

                {playerName && (
                    <p className="mt-3 text-xs text-[#526068]">
                        PLAYER · {playerName}
                    </p>
                )}

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#68757b]">
                    {excerpt || 'Read the full analysis for a detailed scouting perspective.'}
                </p>

                <p className="mt-auto pt-7 text-[10px] tracking-[0.15em] text-[#526068]">
                    READ MORE →
                </p>
            </div>
        </Link>
    )
}

async function FeaturedPlayers() {
    let players: Player[] = []

    try {
        players = await client.fetch(featuredPlayersQuery)
    } catch (error) {
        console.error('Failed to load featured players:', error)
    }

    if (!players.length) {
        return (
            <p className="py-6 text-sm leading-6 text-[#68757b]">
                No featured players yet. Add a player and publish a linked
                scouting report in Sanity Studio to display the profile here.
            </p>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-3">
            {players.map((player) => (
                <PlayerCard key={player._id} player={player} />
            ))}
        </div>
    )
}

async function LatestAnalysis() {
    let analyses: Analysis[] = []

    try {
        analyses = await client.fetch(playerAnalysisListQuery)
    } catch (error) {
        console.error('Failed to load player analyses:', error)
    }

    if (!analyses.length) {
        return (
            <p className="py-6 text-sm text-[#68757b]">
                No published player analyses yet.
            </p>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-3">
            {analyses.slice(0, 3).map((analysis) => (
                <ContentCard
                    key={analysis._id}
                    title={analysis.title}
                    slug={analysis.slug}
                    excerpt={analysis.excerpt}
                    publishedAt={analysis.publishedAt}
                    image={analysis.mainImage}
                    playerName={analysis.player?.name}
                    href="/scouting/player-analysis"
                    label="PLAYER ANALYSIS"
                />
            ))}
        </div>
    )
}

function SectionFallback() {
    return (
        <p className="py-8 text-sm text-[#68757b]">
            Loading scouting content...
        </p>
    )
}

export default function ScoutingPage() {
    return (
        <main className="min-h-screen bg-[#071827] text-[#eee8da]">
            <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
                <p className="mb-5 text-xs tracking-[0.25em] text-[#bdb5a5]">
                    THE FISHERMEN / SCOUTING
                </p>

                <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl">
                    Scouting
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-7 text-[#aeb9bd]">
                    Player profiles, role analysis and the details that help
                    identify talent before everyone else sees it.
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                    <Link
                        href="/scouting/players"
                        className="inline-flex min-h-[52px] items-center justify-center border border-white bg-transparent px-6 py-3 text-xs tracking-[0.12em] text-[#eee8da] transition-all duration-300 hover:bg-white hover:text-[#071827]"
                    >
                        EXPLORE PLAYERS →
                    </Link>

                    <Link
                        href="/scouting/player-analysis"
                        className="inline-flex min-h-[52px] items-center justify-center border border-white bg-transparent px-6 py-3 text-xs tracking-[0.12em] text-[#eee8da] transition-all duration-300 hover:bg-white hover:text-[#071827]"
                    >
                        PLAYER ANALYSIS →
                    </Link>
                </div>
            </section>

            <section className="bg-[#f5f1e8] px-6 py-16 text-[#10202b] md:py-20">
                <div className="mx-auto max-w-7xl">
                    <SectionHeading
                        eyebrow="THE PLAYER DATABASE"
                        title="Featured Players"
                        href="/scouting/players"
                        linkLabel="ALL PLAYERS"
                    />

                    <Suspense fallback={<SectionFallback />}>
                        <FeaturedPlayers />
                    </Suspense>
                </div>
            </section>

            <section className="bg-[#f5f1e8] px-6 py-16 text-[#10202b] md:py-20">
                <div className="mx-auto max-w-7xl">
                    <SectionHeading
                        eyebrow="TECHNICAL & TACTICAL DETAIL"
                        title="Latest Player Analysis"
                        href="/scouting/player-analysis"
                        linkLabel="ALL ANALYSIS"
                    />

                    <Suspense fallback={<SectionFallback />}>
                        <LatestAnalysis />
                    </Suspense>
                </div>
            </section>

            <section className="bg-[#0c2234] px-6 py-20">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="mb-5 text-xs tracking-[0.25em] text-[#bdb5a5]">
                        OUR APPROACH
                    </p>

                    <h2 className="font-serif text-4xl leading-tight md:text-5xl">
                        We scout the player behind the numbers.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#aeb9bd]">
                        Role, context, behaviour and decision-making matter.
                        The numbers tell part of the story. The football tells
                        the rest.
                    </p>
                </div>
            </section>
        </main>
    )
}
