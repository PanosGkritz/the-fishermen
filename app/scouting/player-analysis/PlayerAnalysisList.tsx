
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

type Analysis = {
    _id: string
    title: string
    slug: string
    excerpt?: string
    analysisType?: string
    publishedAt?: string
    featured?: boolean
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
        photo?: {
            asset?: {
                _ref?: string
            }
        }
    }
}

type Props = {
    analyses: Analysis[]
}

const typeLabels: Record<string, string> = {
    playingStyle: 'Playing style',
    tactical: 'Tactical analysis',
    technical: 'Technical analysis',
    matchBased: 'Match analysis',
}

export default function PlayerAnalysisList({ analyses }: Props) {
    const [search, setSearch] = useState('')
    const [selectedType, setSelectedType] = useState('all')

    const filteredAnalyses = useMemo(() => {
        const term = search.trim().toLowerCase()

        return analyses.filter((analysis) => {
            const matchesSearch =
                !term ||
                analysis.title?.toLowerCase().includes(term) ||
                analysis.player?.name?.toLowerCase().includes(term) ||
                analysis.player?.club?.toLowerCase().includes(term)

            const matchesType =
                selectedType === 'all' ||
                analysis.analysisType === selectedType

            return matchesSearch && matchesType
        })
    }, [analyses, search, selectedType])

    return (
        <div>
            <div className="mb-8 grid gap-4 md:grid-cols-[1fr_240px]">
                <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search player, club or analysis..."
                    aria-label="Search player analyses"
                    className="w-full border border-[#294052] bg-transparent px-4 py-3 text-sm text-[#10202b] outline-none transition placeholder:text-[#71818b] focus:border-[#071827]"
                />

                <select
                    value={selectedType}
                    onChange={(event) => setSelectedType(event.target.value)}
                    aria-label="Filter analysis type"
                    className="w-full border border-[#294052] bg-[#071827] px-4 py-3 text-sm text-[#eee8da] outline-none focus:border-[#bdb5a5]"
                >
                    <option value="all">All analysis types</option>
                    <option value="playingStyle">Playing style</option>
                    <option value="tactical">Tactical analysis</option>
                    <option value="technical">Technical analysis</option>
                    <option value="matchBased">Match analysis</option>
                </select>
            </div>

            {filteredAnalyses.length === 0 ? (
                <div className="border border-[#294052] px-6 py-16 text-center">
                    <h2 className="font-serif text-2xl">
                        No analyses found
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[#657581]">
                        Published analyses will appear here. Try another
                        search or filter.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredAnalyses.map((analysis) => (
                        <article
                            key={analysis._id}
                            className="group flex flex-col overflow-hidden border border-[#294052] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#071827]"
                        >
                            <Link
                                href={`/scouting/player-analysis/${analysis.slug}`}
                                className="flex h-full flex-col"
                            >
                                {analysis.mainImage?.asset?._ref ? (
                                    <div className="aspect-[16/10] overflow-hidden bg-[#102738]">
                                        <img
                                            src={urlFor(analysis.mainImage)
                                                .width(900)
                                                .height(560)
                                                .fit('crop')
                                                .auto('format')
                                                .url()}
                                            alt={
                                                analysis.mainImage.alt ||
                                                analysis.title
                                            }
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex aspect-[16/10] items-center justify-center bg-[#102738]">
                                        <span className="text-xs tracking-[0.18em] text-[#9daab0]">
                                            The Fishermen
                                        </span>
                                    </div>
                                )}

                                <div className="flex flex-1 flex-col p-5 md:p-6">
                                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-[#657581]">
                                        <span>
                                            {typeLabels[
                                                analysis.analysisType || ''
                                            ] || 'Player analysis'}
                                        </span>

                                        {analysis.publishedAt && (
                                            <>
                                                <span className="text-[#294052]">
                                                    /
                                                </span>
                                                <time
                                                    dateTime={analysis.publishedAt}
                                                >
                                                    {new Date(
                                                        analysis.publishedAt
                                                    ).toLocaleDateString(
                                                        'en-GB',
                                                        {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        }
                                                    )}
                                                </time>
                                            </>
                                        )}
                                    </div>

                                    <h2 className="font-serif text-2xl leading-tight transition-colors duration-300 group-hover:text-[#526572]">
                                        {analysis.title}
                                    </h2>

                                    {analysis.excerpt && (
                                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#657581]">
                                            {analysis.excerpt}
                                        </p>
                                    )}

                                    {analysis.player?.name && (
                                        <div className="mt-6 border-t border-[#294052] pt-4">
                                            <p className="text-xs text-[#657581]">
                                                Player
                                            </p>

                                            <p className="mt-2 text-sm">
                                                {analysis.player.name}
                                            </p>

                                            {analysis.player.club && (
                                                <p className="mt-1 text-sm text-[#657581]">
                                                    {analysis.player.club}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <span className="mt-auto pt-6 text-xs tracking-[0.12em] text-[#526572] transition-colors group-hover:text-[#071827]">
                                        Read analysis →
                                    </span>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}
