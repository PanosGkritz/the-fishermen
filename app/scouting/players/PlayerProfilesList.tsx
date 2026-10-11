
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

type Player = {
  _id: string
  name: string
  slug: string
  club?: string
  league?: string
  primaryPosition?: string
  photo?: unknown
  latestReport?: {
    title?: string
    excerpt?: string
    slug?: string
  }
}

export default function PlayerProfilesList({
  players,
}: {
  players: Player[]
}) {
  const [search, setSearch] = useState('')

  const filteredPlayers = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (!term) return players

    return players.filter((player) =>
      [player.name, player.club]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(term)),
    )
  }, [players, search])

  return (
    <section className="pt-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#657581]">
          {filteredPlayers.length}{' '}
          {filteredPlayers.length === 1 ? 'player' : 'players'}
        </p>

        <label className="flex w-full items-center gap-3 border border-[#294052] px-4 sm:max-w-md">
          <span className="text-[#657581]" aria-hidden="true">
            ⌕
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search player or club..."
            aria-label="Search by player name or club"
            className="w-full bg-transparent py-4 text-sm text-[#10202b] outline-none placeholder:text-[#71818a]"
          />
        </label>
      </div>

      {filteredPlayers.length === 0 ? (
        <div className="border border-[#294052] px-6 py-16 text-center">
          <h2 className="text-xl font-medium text-[#10202b]">
            {players.length === 0
              ? 'No published scouting reports yet'
              : 'No players found'}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#657581]">
            {players.length === 0
              ? 'Published player reports will appear here once they are added in the Studio.'
              : 'Try another player name or club.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlayers.map((player) => {
            const imageUrl = player.photo
              ? urlFor(player.photo as Parameters<typeof urlFor>[0])
                  .width(700)
                  .height(850)
                  .fit('crop')
                  .url()
              : null

            return (
              <Link
                key={player._id}
                href={`/scouting/players/${player.slug}`}
                className="group block border border-[#294052] bg-[#071827] text-[#eee8da] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bdb5a5]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#102536]">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt={player.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.25em] text-[#9daab0]">
                      Player Image
                    </div>
                  )}

                  <span className="absolute left-4 top-4 bg-[#071827]/90 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#eee8da]">
                    {player.primaryPosition || 'Player'}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-medium transition-colors duration-300 group-hover:text-white">
                    {player.name}
                  </h2>

                  <p className="mt-2 text-sm text-[#bdb5a5]">
                    {[player.club, player.league]
                      .filter(Boolean)
                      .join(' · ') || 'Club information unavailable'}
                  </p>

                  {player.latestReport?.title && (
                    <p className="mt-5 border-t border-[#294052] pt-4 text-xs uppercase leading-5 tracking-[0.12em] text-[#bdb5a5]">
                      Latest report: {player.latestReport.title}
                    </p>
                  )}

                  <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#eee8da]">
                    <span>View Profile</span>
                    <span
                      aria-hidden="true"
                      className="transition group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}
