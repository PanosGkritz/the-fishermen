
'use client'

import { useState } from 'react'
import Link from 'next/link'

const socialLinks = [
  {
    label: 'INSTAGRAM',
    href: 'https://www.instagram.com/thefsrmen/',
  },
  {
    label: 'X',
    href: 'https://x.com/thefishermen_',
  },
  {
    label: 'TIKTOK',
    href: 'https://www.tiktok.com/@thefsrmen',
  },
]

const email = 'thefishermen2026@gmail.com'

export default function AboutPage() {
  const [emailVisible, setEmailVisible] = useState(false)

  return (
    <main className="min-h-screen bg-[#071827] text-[#eee8da]">
      <section className="mx-auto max-w-7xl px-6 py-14 md:py-16">
        <p className="mb-4 text-xs tracking-[0.25em] text-[#bdb5a5]">
          THE FISHERMEN
        </p>

        <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl">
          About us
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#aeb9bd]">
          Here, we don&apos;t just share news. We analyse footballers worth
          watching, suggest solutions for teams seeking specific qualities,
          and highlight opportunities in the transfer market.
        </p>

        <p className="mt-4 max-w-2xl text-base leading-7 text-[#aeb9bd]">
          🎯 Our goal is to connect teams&apos; needs with the right players
          through scouting, analysis and football logic.
        </p>

        <p className="mt-4 max-w-2xl text-base leading-7 text-[#aeb9bd]">
          If you love scouting and smart transfer recommendations, follow us.
        </p>
      </section>

      <section className="bg-[#f5f1e8] px-6 py-12 text-[#10202b] md:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            <div>
              <p className="mb-4 text-xs tracking-[0.2em] text-[#7b8589]">
                OUR PHILOSOPHY
              </p>

              <h2 className="font-serif text-3xl leading-tight md:text-4xl">
                Finding the details others miss.
              </h2>
            </div>

            <div className="text-sm leading-7 text-[#526068]">
              <p>
                Football is more than results, formations and statistics.
                Behind every team is a structure. Behind every player is a
                role. And behind every recruitment decision is a reason.
              </p>

              <p className="mt-4">
                The Fishermen explores these details through tactical
                analysis, scouting and recruitment thinking — from the pitch
                to the market.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#071827] px-6 py-12 md:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 border-b border-[#294052] pb-4">
            <p className="text-xs tracking-[0.2em] text-[#bdb5a5]">
              WHAT WE DO
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/analysis"
              className="border border-[#294052] bg-[#0c2234] p-6 transition-colors hover:border-[#bdb5a5]"
            >
              <p className="text-[10px] tracking-[0.2em] text-[#bdb5a5]">01</p>
              <h3 className="mt-6 font-serif text-2xl">Analysis</h3>
              <p className="mt-3 text-sm leading-6 text-[#aeb9bd]">
                Understanding tactical structures, team behaviour and the
                moments that change games.
              </p>
              <p className="mt-5 text-[10px] tracking-[0.15em] text-[#bdb5a5]">
                EXPLORE ANALYSIS →
              </p>
            </Link>

            <Link
              href="/scouting"
              className="border border-[#294052] bg-[#0c2234] p-6 transition-colors hover:border-[#bdb5a5]"
            >
              <p className="text-[10px] tracking-[0.2em] text-[#bdb5a5]">02</p>
              <h3 className="mt-6 font-serif text-2xl">Scouting</h3>
              <p className="mt-3 text-sm leading-6 text-[#aeb9bd]">
                Looking beyond statistics to understand player roles,
                behaviours, strengths and potential.
              </p>
              <p className="mt-5 text-[10px] tracking-[0.15em] text-[#bdb5a5]">
                EXPLORE SCOUTING →
              </p>
            </Link>

            <Link
              href="/recruitment"
              className="border border-[#294052] bg-[#0c2234] p-6 transition-colors hover:border-[#bdb5a5]"
            >
              <p className="text-[10px] tracking-[0.2em] text-[#bdb5a5]">03</p>
              <h3 className="mt-6 font-serif text-2xl">Recruitment</h3>
              <p className="mt-3 text-sm leading-6 text-[#aeb9bd]">
                Connecting player profiles with team identity, tactical
                needs and long-term recruitment strategy.
              </p>
              <p className="mt-5 text-[10px] tracking-[0.15em] text-[#bdb5a5]">
                EXPLORE RECRUITMENT →
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#0c2234] px-6 py-12 md:py-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs tracking-[0.25em] text-[#bdb5a5]">
            THE FISHERMEN
          </p>

          <h2 className="font-serif text-3xl leading-tight md:text-5xl">
            Football is won in the details.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#aeb9bd]">
            We are here to find them.
          </p>
        </div>
      </section>

      <section className="border-t border-[#294052] bg-[#071827] px-6 py-12 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 text-xs tracking-[0.25em] text-[#bdb5a5]">
              GET IN TOUCH
            </p>

            <h2 className="font-serif text-3xl md:text-4xl">
              Let&apos;s talk football.
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-[#aeb9bd]">
              For enquiries, collaborations or football-related discussions,
              get in touch with The Fishermen.
            </p>

            <button
              type="button"
              onClick={() => setEmailVisible((visible) => !visible)}
              aria-expanded={emailVisible}
              className="mt-5 inline-flex min-h-[46px] items-center border border-white px-5 py-3 text-xs tracking-[0.12em] transition-colors hover:bg-white hover:text-[#071827]"
            >
              {emailVisible ? 'HIDE EMAIL ↑' : 'EMAIL THE FISHERMEN →'}
            </button>

            {emailVisible && (
              <div className="mt-4 border border-[#294052] bg-[#0c2234] p-4">
                <p className="mb-2 text-[10px] tracking-[0.2em] text-[#9daab0]">
                  CONTACT EMAIL
                </p>
                <a
                  href={`mailto:${email}`}
                  className="break-all text-sm text-[#eee8da] underline underline-offset-4 hover:text-[#bdb5a5]"
                >
                  {email}
                </a>
              </div>
            )}
          </div>

          <div className="border-t border-[#294052] pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <p className="mb-4 text-xs tracking-[0.2em] text-[#bdb5a5]">
              FOLLOW OUR WORK
            </p>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[42px] items-center border border-[#526a78] px-4 py-3 text-xs tracking-[0.12em] transition-colors hover:border-[#eee8da] hover:bg-[#eee8da] hover:text-[#071827]"
                >
                  {social.label} ↗
                </a>
              ))}
            </div>

            <p className="mt-4 text-xs text-[#9daab0]">
              Independent football analysis, scouting &amp; recruitment.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
