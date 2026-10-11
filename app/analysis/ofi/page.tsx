
export default function OFIArticlePage() {
  return (
    <main className="min-h-screen bg-[#071827] text-[#eee8da]">

      {/* ARTICLE HEADER */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-8 flex flex-wrap items-center gap-4 text-[10px] tracking-[0.2em] text-[#bdb5a5]">
          <span>TEAM DNA</span>
          <span className="text-[#526068]">•</span>
          <span>09 OCTOBER 2026</span>
        </div>

        <h1 className="max-w-5xl font-serif text-5xl leading-[0.95] md:text-7xl">
          How OFI surprised Greece — and built a team Europe should watch
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-[#aeb9bd]">
          How a clear football identity, defensive structure and smart
          recruitment helped OFI build a team capable of competing beyond
          expectations.
        </p>

        <div className="mt-8 flex items-center gap-4 text-xs text-[#7f8b90]">
          <span>THE FISHERMEN</span>
          <span>·</span>
          <span>ANALYSIS</span>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-2xl border border-[#294052]">
          <img
            src="/OFI-1.jpg"
            alt="OFI celebrating with the trophy"
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <article className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-xl leading-9 text-[#d5dadd]">
          OFI's rise is not simply a story about results. It is a story about
          identity.
        </p>

        <p className="mt-8 text-base leading-8 text-[#aeb9bd]">
          In modern football, smaller clubs rarely compete with the biggest
          teams by trying to replicate their resources. They compete by
          becoming clearer about who they are.
        </p>

        {/* SECTION */}
        <h2 className="mt-16 font-serif text-3xl leading-tight md:text-4xl">
          A team built around an idea
        </h2>

        <p className="mt-6 text-base leading-8 text-[#aeb9bd]">
          The first thing that stands out about OFI is the consistency of its
          football identity. The team does not rely on isolated moments or
          individual brilliance. Its structure gives players clear
          responsibilities in and out of possession.
        </p>

        <p className="mt-6 text-base leading-8 text-[#aeb9bd]">
          That clarity becomes particularly important without the ball.
          Defensive distances remain compact, pressure has clear triggers and
          the team understands when to step forward and when to protect space.
        </p>

        {/* SECTION */}
        <h2 className="mt-16 font-serif text-3xl leading-tight md:text-4xl">
          Pressing with purpose
        </h2>

        <p className="mt-6 text-base leading-8 text-[#aeb9bd]">
          Pressing is not simply about running towards the ball. The best
          pressing teams manipulate the opponent's options before the pressure
          actually arrives.
        </p>

        <p className="mt-6 text-base leading-8 text-[#aeb9bd]">
          OFI's structure allows the first defender to influence where the
          opposition can play, while the players behind him close the next
          available options.
        </p>

        {/* PULL QUOTE */}
        <blockquote className="my-16 border-l border-[#bdb5a5] pl-7 font-serif text-2xl leading-9 text-[#eee8da] md:text-3xl">
          The real strength of a team is often found in what happens before
          the ball reaches the player we are watching.
        </blockquote>

        {/* SECTION */}
        <h2 className="mt-16 font-serif text-3xl leading-tight md:text-4xl">
          Recruitment that fits the football
        </h2>

        <p className="mt-6 text-base leading-8 text-[#aeb9bd]">
          Recruitment becomes more effective when the club knows exactly what
          it wants from each position.
        </p>

        <p className="mt-6 text-base leading-8 text-[#aeb9bd]">
          Instead of simply searching for the most talented player available,
          the process starts with the role. What does the player need to do?
          What behaviours are essential? Which weaknesses can the structure
          protect?
        </p>

        <p className="mt-6 text-base leading-8 text-[#aeb9bd]">
          This is where scouting and tactical analysis become connected.
          Recruitment is no longer a separate department from football
          identity. It becomes part of it.
        </p>

        {/* SECTION */}
        <h2 className="mt-16 font-serif text-3xl leading-tight md:text-4xl">
          Why Europe should be watching
        </h2>

        <p className="mt-6 text-base leading-8 text-[#aeb9bd]">
          OFI's story is interesting precisely because it offers something
          larger than one successful season.
        </p>

        <p className="mt-6 text-base leading-8 text-[#aeb9bd]">
          It demonstrates how a club can create competitive advantage through
          clarity: clarity of identity, clarity of roles and clarity in
          recruitment.
        </p>

        <p className="mt-6 text-base leading-8 text-[#aeb9bd]">
          That is what makes OFI worth watching. Not simply where the team is
          today, but what the underlying model could become tomorrow.
        </p>

        {/* END */}
        <div className="mt-20 border-t border-[#294052] pt-8">
          <p className="text-[10px] tracking-[0.2em] text-[#bdb5a5]">
            THE FISHERMEN
          </p>

          <p className="mt-4 font-serif text-2xl">
            Finding the details others miss.
          </p>

          <a
            href="/analysis"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#526575] px-5 py-3 text-xs tracking-[0.12em] transition-all duration-300 hover:border-[#eee8da] hover:bg-[#eee8da] hover:text-[#071827]"
          >
            ← BACK TO ANALYSIS
          </a>
        </div>
      </article>

      {/* FOOTER */}
      <footer className="border-t border-[#294052] bg-[#071827] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-xs text-[#9daab0] md:flex-row">
          <div>
            <a
              href="/"
              className="font-semibold tracking-[0.15em] text-[#eee8da] transition-colors hover:text-[#bdb5a5]"
            >
              THE FISHERMEN
            </a>

            <p className="mt-2">
              Scouting · Analysis · Recruitment
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
            <a
              href="https://www.instagram.com/thefsrmen/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#eee8da]"
            >
              INSTAGRAM
            </a>

            <a
              href="https://x.com/thefishermen_"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#eee8da]"
            >
              X
            </a>

            <a
              href="https://www.tiktok.com/@thefsrmen"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#eee8da]"
            >
              TIKTOK
            </a>

            <a
              href="mailto:thefishermen2026@gmail.com"
              className="transition-colors hover:text-[#eee8da]"
            >
              CONTACT
            </a>
          </div>
        </div>
      </footer>

    </main>
  )
}
