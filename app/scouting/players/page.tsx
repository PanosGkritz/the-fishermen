
import { Suspense } from 'react'
import { client } from '@/sanity/lib/client'
import { playerProfilesQuery } from '@/sanity/lib/queries'
import PlayerProfilesList from './PlayerProfilesList'

async function PlayerProfilesContent() {
    const players = await client.fetch(playerProfilesQuery)

    return <PlayerProfilesList players={players ?? []} />
}

function PlayerProfilesFallback() {
    return (
        <p className="py-12 text-sm text-[#9daab0]">
            Loading player profiles...
        </p>
    )
}

export default function PlayerProfilesPage() {
    return (
        <main className="min-h-screen bg-[#f5f1e8] text-[#10202b]">
            <section className="bg-[#071827] text-[#eee8da]">
                <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
                    <p className="mb-4 text-xs tracking-[0.3em] text-[#bdb5a5]">
                        The Fishermen / Scouting
                    </p>

                    <h1 className="max-w-4xl font-serif text-4xl leading-tight md:text-6xl">
                        Player Profiles
                    </h1>

                    <div className="mt-6 flex flex-col gap-6 border-b border-[#294052] pb-10 md:flex-row md:items-center md:justify-between">
                        <p className="max-w-2xl text-base leading-7 text-[#9daab0] md:text-lg">
                            Detailed player scouting, technical and tactical
                            evaluations, strengths, weaknesses and potential
                            role suitability.
                        </p>

                        <a
                            href="/scouting"
                            className="inline-flex min-h-[52px] shrink-0 items-center justify-center self-start border border-[#294052] px-6 py-3 text-xs tracking-[0.18em] text-[#eee8da] transition-colors duration-300 hover:border-[#bdb5a5] hover:bg-[#102738] md:self-center"
                        >
                            Back to Scouting
                        </a>
                    </div>
                </div>
            </section>

            <section className="bg-[#f5f1e8] px-6 pb-16 pt-10 text-[#10202b] md:px-10">
                <div className="mx-auto max-w-7xl">
                    <Suspense fallback={<PlayerProfilesFallback />}>
                        <PlayerProfilesContent />
                    </Suspense>
                </div>
            </section>
        </main>
    )
}
