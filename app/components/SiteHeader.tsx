
'use client'

import Link from 'next/link'
import { useState } from 'react'

const scoutingLinks = [
  { href: '/scouting', label: 'SCOUTING HOME' },
  { href: '/scouting/players', label: 'PLAYER PROFILES' },
  { href: '/scouting/player-analysis', label: 'PLAYER ANALYSIS' },
]

const analysisLinks = [
  { href: '/analysis', label: 'ANALYSIS HOME' },
  { href: '/analysis?category=teamAnalysis', label: 'TEAM ANALYSIS' },
  { href: '/analysis?category=matchAnalysis', label: 'MATCH ANALYSIS' },
  { href: '/analysis?category=dataPerformance', label: 'DATA & PERFORMANCE' },
]

const recruitmentLinks = [
  { href: '/recruitment', label: 'RECRUITMENT ANALYSIS' },
  {
    href: '/recruitment/market-opportunities',
    label: 'MARKET OPPORTUNITIES',
  },
]

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [analysisOpen, setAnalysisOpen] = useState(false)
  const [scoutingOpen, setScoutingOpen] = useState(false)
  const [recruitmentOpen, setRecruitmentOpen] = useState(false)

  function closeMenus() {
    setMobileMenuOpen(false)
    setAnalysisOpen(false)
    setScoutingOpen(false)
    setRecruitmentOpen(false)
  }

  return (
    <header className="relative z-50 border-b border-[#294052] bg-[#071827] text-[#eee8da]">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-6 pb-4 pt-3 lg:gap-8">
        <Link
          href="/"
          onClick={closeMenus}
          aria-label="The Fishermen home"
          className="block min-w-0 shrink"
        >
          <img
            src="/fishermen-header.png"
            alt="THE FISHERMEN — Scouting, Analysis, Recruitment"
            className="block h-auto w-[min(540px,60vw)] object-contain"
          />
        </Link>

        <nav className="hidden shrink-0 items-center gap-7 pb-1 text-sm tracking-[0.08em] lg:flex xl:gap-9 xl:text-base">
          {/* ANALYSIS DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => {
              setAnalysisOpen(true)
              setScoutingOpen(false)
              setRecruitmentOpen(false)
            }}
            onMouseLeave={() => setAnalysisOpen(false)}
          >
            <button
              type="button"
              onClick={() => {
                setAnalysisOpen((open) => !open)
                setScoutingOpen(false)
                setRecruitmentOpen(false)
              }}
              aria-expanded={analysisOpen}
              className="flex items-center gap-2 transition-colors duration-300 hover:text-[#bdb5a5]"
            >
              ANALYSIS
              <span className="text-[10px]" aria-hidden="true">
                {analysisOpen ? '▲' : '▼'}
              </span>
            </button>

            {analysisOpen && (
              <div className="absolute left-0 top-full z-50 min-w-64 border border-[#294052] bg-[#071827] py-2 shadow-xl">
                {analysisLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    className="block px-5 py-3 text-xs tracking-[0.12em] transition-colors duration-300 hover:bg-[#102738] hover:text-[#bdb5a5]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* SCOUTING DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => {
              setScoutingOpen(true)
              setAnalysisOpen(false)
              setRecruitmentOpen(false)
            }}
            onMouseLeave={() => setScoutingOpen(false)}
          >
            <button
              type="button"
              onClick={() => {
                setScoutingOpen((open) => !open)
                setAnalysisOpen(false)
                setRecruitmentOpen(false)
              }}
              aria-expanded={scoutingOpen}
              className="flex items-center gap-2 transition-colors duration-300 hover:text-[#bdb5a5]"
            >
              SCOUTING
              <span className="text-[10px]" aria-hidden="true">
                {scoutingOpen ? '▲' : '▼'}
              </span>
            </button>

            {scoutingOpen && (
              <div className="absolute left-0 top-full z-50 min-w-56 border border-[#294052] bg-[#071827] py-2 shadow-xl">
                {scoutingLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    className="block px-5 py-3 text-xs tracking-[0.12em] transition-colors duration-300 hover:bg-[#102738] hover:text-[#bdb5a5]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* RECRUITMENT DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => {
              setRecruitmentOpen(true)
              setAnalysisOpen(false)
              setScoutingOpen(false)
            }}
            onMouseLeave={() => setRecruitmentOpen(false)}
          >
            <button
              type="button"
              onClick={() => {
                setRecruitmentOpen((open) => !open)
                setAnalysisOpen(false)
                setScoutingOpen(false)
              }}
              aria-expanded={recruitmentOpen}
              className="flex items-center gap-2 transition-colors duration-300 hover:text-[#bdb5a5]"
            >
              RECRUITMENT
              <span className="text-[10px]" aria-hidden="true">
                {recruitmentOpen ? '▲' : '▼'}
              </span>
            </button>

            {recruitmentOpen && (
              <div className="absolute left-0 top-full z-50 min-w-64 border border-[#294052] bg-[#071827] py-2 shadow-xl">
                {recruitmentLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    className="block px-5 py-3 text-xs tracking-[0.12em] transition-colors duration-300 hover:bg-[#102738] hover:text-[#bdb5a5]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about"
            className="transition-colors duration-300 hover:text-[#bdb5a5]"
          >
            ABOUT
          </Link>
        </nav>

        {/* MOBILE MENU */}
        <div className="relative shrink-0 pb-1 lg:hidden">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((open) => !open)
              setAnalysisOpen(false)
              setScoutingOpen(false)
              setRecruitmentOpen(false)
            }}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="whitespace-nowrap text-xs tracking-[0.15em] transition-colors duration-300 hover:text-[#bdb5a5] sm:text-sm"
          >
            {mobileMenuOpen ? 'CLOSE ✕' : 'MENU ☰'}
          </button>

          {mobileMenuOpen && (
            <nav className="absolute right-0 top-full z-50 mt-4 flex max-h-[75vh] min-w-64 flex-col gap-1 overflow-y-auto border border-[#294052] bg-[#071827] p-4 text-sm shadow-xl">
              {/* MOBILE ANALYSIS */}
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setAnalysisOpen((open) => !open)
                    setScoutingOpen(false)
                    setRecruitmentOpen(false)
                  }}
                  aria-expanded={analysisOpen}
                  className="flex w-full items-center justify-between px-3 py-3 text-left transition-colors hover:text-[#bdb5a5]"
                >
                  ANALYSIS
                  <span aria-hidden="true">
                    {analysisOpen ? '−' : '+'}
                  </span>
                </button>

                {analysisOpen && (
                  <div className="ml-3 border-l border-[#294052]">
                    {analysisLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenus}
                        className="block px-4 py-3 text-xs tracking-[0.08em] text-[#9daab0] transition-colors hover:text-[#eee8da]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* MOBILE SCOUTING */}
              <div className="border-t border-[#294052]">
                <button
                  type="button"
                  onClick={() => {
                    setScoutingOpen((open) => !open)
                    setAnalysisOpen(false)
                    setRecruitmentOpen(false)
                  }}
                  aria-expanded={scoutingOpen}
                  className="flex w-full items-center justify-between px-3 py-3 text-left transition-colors hover:text-[#bdb5a5]"
                >
                  SCOUTING
                  <span aria-hidden="true">
                    {scoutingOpen ? '−' : '+'}
                  </span>
                </button>

                {scoutingOpen && (
                  <div className="ml-3 border-l border-[#294052]">
                    {scoutingLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenus}
                        className="block px-4 py-3 text-xs tracking-[0.08em] text-[#9daab0] transition-colors hover:text-[#eee8da]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* MOBILE RECRUITMENT */}
              <div className="border-t border-[#294052]">
                <button
                  type="button"
                  onClick={() => {
                    setRecruitmentOpen((open) => !open)
                    setAnalysisOpen(false)
                    setScoutingOpen(false)
                  }}
                  aria-expanded={recruitmentOpen}
                  className="flex w-full items-center justify-between px-3 py-3 text-left transition-colors hover:text-[#bdb5a5]"
                >
                  RECRUITMENT
                  <span aria-hidden="true">
                    {recruitmentOpen ? '−' : '+'}
                  </span>
                </button>

                {recruitmentOpen && (
                  <div className="ml-3 border-l border-[#294052]">
                    {recruitmentLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenus}
                        className="block px-4 py-3 text-xs tracking-[0.08em] text-[#9daab0] transition-colors hover:text-[#eee8da]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/about"
                onClick={closeMenus}
                className="border-t border-[#294052] px-3 py-3 transition-colors hover:bg-[#102738] hover:text-[#bdb5a5]"
              >
                ABOUT
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
