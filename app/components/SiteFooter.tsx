
import Link from 'next/link'

const mainLinks = [
  { href: '/analysis', label: 'ANALYSIS' },
  { href: '/scouting', label: 'SCOUTING' },
  { href: '/recruitment', label: 'RECRUITMENT' },
  { href: '/about', label: 'ABOUT' },
]

const socialLinks = [
  { href: 'https://www.instagram.com/thefsrmen/', label: 'INSTAGRAM' },
  { href: 'https://x.com/thefishermen_', label: 'X' },
  { href: 'https://www.tiktok.com/@thefsrmen', label: 'TIKTOK' },
]

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#294052] bg-[#071827] px-6 py-8 text-xs text-[#9daab0]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
        {/* BRAND — LEFT */}
        <div className="text-center md:text-left">
          <Link
            href="/"
            className="font-semibold tracking-[0.15em] text-[#eee8da] transition-colors hover:text-[#bdb5a5]"
          >
            THE FISHERMEN
          </Link>
          <p className="mt-2">Scouting · Analysis · Recruitment</p>
        </div>

        {/* MAIN NAVIGATION — CENTER */}
        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#eee8da]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CONTACT + SOCIALS — RIGHT */}
        <nav
          aria-label="Contact and social media"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:justify-end"
        >
          <Link
            href="/contact"
            className="transition-colors hover:text-[#eee8da]"
          >
            CONTACT
          </Link>

          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#eee8da]"
            >
              {social.label} ↗
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
