
import { Suspense } from 'react'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { playerAnalysisListQuery } from '@/sanity/lib/queries'
import PlayerAnalysisList from './PlayerAnalysisList'

async function PlayerAnalysisContent() {
    const analyses = await client.fetch(playerAnalysisListQuery)

    return <PlayerAnalysisList analyses={analyses ?? []} />
}

function PlayerAnalysisFallback() {
    return (
        <p className="py-12 text-sm text-[#9daab0]">
            Loading analyses...
        </p>
    )
}

export default function PlayerAnalysisPage() {
    return (
        <main className="min-h-screen bg-[#f5f1e8] text-[#10202b]">
            <section className="bg-[#071827] text-[#eee8da]">
                <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
                    <p className="mb-4 text-xs tracking-[0.3em] text-[#bdb5a5]">
                        The Fishermen / Scouting
                    </p>

                    <h1 className="max-w-4xl font-serif text-4xl leading-tight md:text-6xl">
                        Player Analysis
                    </h1>

                    <div className="mt-6 flex flex-col gap-6 border-b border-[#294052] pb-10 md:flex-row md:items-center md:justify-between">
                        <p className="max-w-2xl text-base leading-7 text-[#9daab0] md:text-lg">
                            Σε βάθος ανάλυση των χαρακτηριστικών των παικτών, των τεχνικών τους ικανοτήτων,
                             της τακτικής τους συμπεριφοράς και των εμφανίσεών τους στους αγώνες.
                        </p>

                        <Link
                            href="/scouting"
                            className="inline-flex min-h-[52px] shrink-0 items-center justify-center self-start border border-[#294052] px-6 py-3 text-xs tracking-[0.18em] text-[#eee8da] transition-colors duration-300 hover:border-[#bdb5a5] hover:bg-[#102738] md:self-center"
                        >
                            Back to Scouting
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-[#f5f1e8] px-6 pb-16 pt-10 text-[#10202b] md:px-10">
                <div className="mx-auto max-w-7xl">
                    <Suspense fallback={<PlayerAnalysisFallback />}>
                        <PlayerAnalysisContent />
                    </Suspense>
                </div>
            </section>
        </main>
    )
}
