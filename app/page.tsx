
'use client'

import { useEffect, useRef, useState } from 'react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
  featuredAnalysisQuery,
  latestHomepageContentQuery,
} from '@/sanity/lib/queries'

type Article = {
  _id: string
  _type?: string
  title: string
  slug: string
  excerpt?: string
  section?: string
  contentLabel?: string
  featured?: boolean
  publishedAt?: string
  mainImage?: {
    asset?: {
      _ref?: string
      _id?: string
    }
    alt?: string
  }
}

const ofiArticle: Article = {
  _id: 'manual-ofi-analysis',
  _type: 'post',
  title: 'How OFI surprised Greece — and built a team Europe should watch',
  slug: 'ofi',
  excerpt: 'Team DNA · Pressing · Defensive structure · Recruitment',
  section: 'analysis',
  contentLabel: 'TEAM ANALYSIS',
  publishedAt: '2026-10-09T12:00:00Z',
}

function articleHref(article: Article) {
  if (article.slug === 'ofi') {
    return '/analysis/ofi'
  }

  if (article._type === 'scoutingReport') {
    return `/scouting/reports/${article.slug}`
  }

  if (article._type === 'playerAnalysis') {
    return `/scouting/player-analysis/${article.slug}`
  }

  return `/articles/${article.slug}`
}

function formatDate(date?: string) {
  if (!date) return ''

  return new Date(date)
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase()
}

function getImageUrl(article: Article) {
  if (article.slug === 'ofi') {
    return '/OFI-1.jpg'
  }

  if (!article.mainImage?.asset) {
    return null
  }

  return urlFor(article.mainImage).width(900).height(600).url()
}

function LatestSlider() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let active = true

    async function loadArticles() {
      try {
        const result: Article[] = await client.fetch(
          latestHomepageContentQuery,
        )

        const combined = [
          ofiArticle,
          ...(result || []).filter((article) => article.slug !== 'ofi'),
        ].sort(
          (a, b) =>
            new Date(b.publishedAt || 0).getTime() -
            new Date(a.publishedAt || 0).getTime(),
        )

        if (active) {
          setArticles(combined)
        }
      } catch (error) {
        console.error('Could not load latest articles:', error)

        if (active) {
          setArticles([ofiArticle])
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadArticles()

    return () => {
      active = false
    }
  }, [])

  function moveSlider(direction: 'left' | 'right') {
    if (!sliderRef.current) return

    const slider = sliderRef.current
    const card = slider.querySelector<HTMLElement>('[data-article-card]')
    const distance = card ? card.offsetWidth + 24 : slider.clientWidth

    slider.scrollBy({
      left: direction === 'right' ? distance : -distance,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <div className="mb-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => moveSlider('left')}
          aria-label="Previous articles"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#cfc8ba] text-xl transition-all duration-300 hover:border-[#10202b] hover:bg-[#10202b] hover:text-[#f5f1e8]"
        >
          ←
        </button>

        <button
          type="button"
          onClick={() => moveSlider('right')}
          aria-label="Next articles"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#cfc8ba] text-xl transition-all duration-300 hover:border-[#10202b] hover:bg-[#10202b] hover:text-[#f5f1e8]"
        >
          →
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[440px] animate-pulse rounded-2xl bg-[#e8e2d7]"
            />
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {articles.map((article) => {
            const imageUrl = getImageUrl(article)

            const label =
              article.contentLabel ||
              (article.section
                ? article.section.toUpperCase()
                : 'THE FISHERMEN')

            return (
              <a
                key={article._id}
                href={articleHref(article)}
                data-article-card
                className="group w-[85%] flex-none snap-start overflow-hidden rounded-2xl border border-[#d4cec2] bg-[#faf8f2] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-[60%] md:w-[calc((100%-3rem)/3)]"
              >
                <div className="h-56 overflow-hidden rounded-t-2xl bg-[#0c2234]">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={article.mainImage?.alt || article.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-xs tracking-[0.2em] text-[#bdb5a5]">
                        THE FISHERMEN
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-7">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[10px] tracking-[0.18em] text-[#7b8589]">
                      {label}
                    </p>

                    {article.publishedAt && (
                      <p className="text-[10px] text-[#8a9498]">
                        {formatDate(article.publishedAt)}
                      </p>
                    )}
                  </div>

                  <h3 className="mt-6 font-serif text-2xl leading-tight transition-colors duration-300 group-hover:text-[#68757b]">
                    {article.title}
                  </h3>

                  {article.excerpt && (
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-[#68757b]">
                      {article.excerpt}
                    </p>
                  )}

                  <p className="mt-7 text-[10px] tracking-[0.15em] text-[#526068]">
                    READ MORE →
                  </p>
                </div>
              </a>
            )
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#d4cec2] bg-[#faf8f2] px-6 py-12 text-center">
          <p className="text-sm leading-7 text-[#68757b]">
            New analysis, scouting reports and recruitment insights will appear
            here as they are published.
          </p>
        </div>
      )}
    </div>
  )
}

function FeaturedAnalysis() {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadFeaturedAnalysis() {
      try {
        const result: Article | null = await client.fetch(
          featuredAnalysisQuery,
        )

        if (active) {
          setArticle(result || ofiArticle)
        }
      } catch (error) {
        console.error('Could not load featured analysis:', error)

        if (active) {
          setArticle(ofiArticle)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadFeaturedAnalysis()

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return (
      <div
        aria-label="Loading featured analysis"
        className="relative block min-h-[460px] animate-pulse overflow-hidden rounded-2xl border border-[#294052] bg-[#102738]"
      >
        <div className="absolute inset-x-0 bottom-0 p-8">
          <div className="mb-4 h-3 w-36 rounded bg-[#294052]" />
          <div className="h-8 max-w-md rounded bg-[#294052]" />
          <div className="mt-4 h-4 max-w-sm rounded bg-[#294052]" />
        </div>
      </div>
    )
  }

  if (!article) return null

  const imageUrl = getImageUrl(article)

  return (
    <a
      href={articleHref(article)}
      className="group relative block min-h-[460px] overflow-hidden rounded-2xl border border-[#294052] bg-[#0c2234]"
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={article.mainImage?.alt || article.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#071827] via-[#071827]/55 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-8">
        <p className="mb-4 text-[10px] tracking-[0.2em] text-[#d0c7b5]">
          FEATURED ANALYSIS
        </p>

        <h2 className="max-w-xl font-serif text-3xl leading-tight md:text-4xl">
          {article.title}
        </h2>

        {article.excerpt && (
          <p className="mt-5 text-sm leading-6 text-[#d1d8da]">
            {article.excerpt}
          </p>
        )}

        <p className="mt-6 text-xs tracking-[0.15em] text-[#d0c7b5]">
          READ ANALYSIS →
        </p>
      </div>
    </a>
  )
}

export default function Home() {
  function scrollToLatest() {
    document.getElementById('latest')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <main className="min-h-screen bg-[#071827] text-[#eee8da]">
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-5 text-xs tracking-[0.25em] text-[#bdb5a5]">
            FOOTBALL INTELLIGENCE
          </p>

          <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] md:text-7xl">
            Πέρα από αυτό που βλέπεις.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-[#b6c0c4]">
           Ανεξάρτητη ποδοσφαιρική ανάλυση, scouting και αξιολόγηση παικτών. Αναζητούμε τις λεπτομέρειες που κάνουν τη διαφορά, αναλύουμε όσα δεν φαίνονται με την πρώτη ματιά και ανακαλύπτουμε τις ιστορίες πίσω από την απόδοση.
          </p>

          <button
            type="button"
            onClick={scrollToLatest}
            className="mt-8 inline-block rounded-full border border-[#eee8da] px-6 py-3 text-xs tracking-[0.15em] transition-all duration-300 hover:bg-[#eee8da] hover:text-[#071827]"
          >
            EXPLORE THE LATEST ↓
          </button>
        </div>

        <FeaturedAnalysis />
      </section>

      <section
        id="latest"
        className="scroll-mt-6 bg-[#f5f1e8] px-6 py-20 text-[#10202b]"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between border-b border-[#cfc8ba] pb-4">
            <div>
              <p className="mb-2 text-[10px] tracking-[0.2em] text-[#7b8589]">
                THE LATEST
              </p>

              <h2 className="text-sm font-semibold tracking-[0.18em]">
                LATEST FROM THE FISHERMEN
              </h2>
            </div>
          </div>

          <LatestSlider />
        </div>
      </section>
    </main>
  )
}
