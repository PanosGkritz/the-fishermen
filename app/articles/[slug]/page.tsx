import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { postBySlugQuery } from '@/sanity/lib/queries'

type ArticleImage = {
  _type?: string
  _key?: string
  asset?: { _ref?: string }
  alt?: string
}

type Article = {
  title: string
  slug: string
  excerpt?: string
  section?: string
  publishedAt?: string
  videoUrl?: string
  mainImage?: ArticleImage
  gallery?: ArticleImage[]
  body?: any[]
  authorName?: string
}

const sectionNames: Record<string, string> = {
  analysis: 'ANALYSIS',
  scouting: 'SCOUTING',
  recruitment: 'RECRUITMENT',
}

function formatDate(date?: string) {
  if (!date) return ''

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

function ArticleFallback() {
  return (
    <main className="min-h-screen bg-[#071827] px-6 py-20 text-[#eee8da]">
      <div className="mx-auto max-w-4xl animate-pulse">
        <div className="h-3 w-32 bg-[#294052]" />
        <div className="mt-8 h-12 max-w-2xl bg-[#294052]" />
        <div className="mt-4 h-5 max-w-xl bg-[#294052]" />
        <div className="mt-12 h-80 w-full rounded-xl bg-[#0c2234]" />
        <div className="mt-12 space-y-4">
          <div className="h-4 w-full bg-[#294052]" />
          <div className="h-4 w-11/12 bg-[#294052]" />
          <div className="h-4 w-10/12 bg-[#294052]" />
        </div>
      </div>
    </main>
  )
}

async function ArticleContent({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const article = (await client.fetch(postBySlugQuery, {
    slug,
  })) as Article | null

  if (!article) notFound()

  const section =
    article.section && sectionNames[article.section]
      ? article.section
      : 'analysis'

  const sectionName = sectionNames[section]

  return (
    <main className="min-h-screen bg-[#071827] text-[#eee8da]">
      <article>
        {/* ARTICLE HEADER */}
        <section className="mx-auto max-w-4xl px-6 pb-12 pt-12 md:pt-20">
          <Link
            href={`/${section}`}
            className="text-[10px] tracking-[0.2em] text-[#bdb5a5] transition-colors hover:text-[#eee8da]"
          >
            ← BACK TO {sectionName}
          </Link>

          <p className="mt-8 text-xs tracking-[0.2em] text-[#bdb5a5]">
            THE FISHERMEN / {sectionName}
          </p>

          <h1 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#b6c0c4]">
              {article.excerpt}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#9daab0]">
            {article.publishedAt && (
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            )}
            {article.authorName && <span>By {article.authorName}</span>}
          </div>
        </section>

        {/* COVER IMAGE */}
        {article.mainImage?.asset?._ref && (
          <div className="mx-auto max-w-6xl px-6">
            <img
              src={urlFor(article.mainImage).width(1800).quality(90).url()}
              alt={article.mainImage.alt || article.title}
              className="max-h-[680px] w-full rounded-xl border border-[#294052] object-cover"
            />
          </div>
        )}

        {/* ARTICLE BODY, INCLUDING INLINE IMAGES */}
        <section className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          {article.body && article.body.length > 0 && (
            <div className="text-base leading-8 text-[#d5dadd] md:text-lg">
              <PortableText
                value={article.body}
                components={{
                  types: {
                    image: ({ value }: { value: ArticleImage }) => {
                      if (!value?.asset?._ref) return null

                      return (
                        <figure className="my-10">
                          <img
                            src={urlFor(value).width(1400).quality(90).url()}
                            alt={value.alt || article.title}
                            loading="lazy"
                            className="h-auto w-full rounded-xl border border-[#294052] object-cover"
                          />
                          {value.alt && (
                            <figcaption className="mt-3 text-center text-xs leading-5 text-[#9daab0]">
                              {value.alt}
                            </figcaption>
                          )}
                        </figure>
                      )
                    },
                  },
                  block: {
                    h1: ({ children }) => (
                      <h2 className="mb-5 mt-12 font-serif text-4xl leading-tight text-[#eee8da]">
                        {children}
                      </h2>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mb-5 mt-12 font-serif text-3xl leading-tight text-[#eee8da]">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mb-4 mt-10 font-serif text-2xl text-[#eee8da]">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="mb-4 mt-8 text-xl font-semibold text-[#eee8da]">
                        {children}
                      </h4>
                    ),
                    normal: ({ children }) => (
                      <p className="mb-6">{children}</p>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="my-8 border-l-2 border-[#bdb5a5] pl-6 font-serif text-xl italic text-[#eee8da]">
                        {children}
                      </blockquote>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="mb-6 list-disc space-y-2 pl-6">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="mb-6 list-decimal space-y-2 pl-6">
                        {children}
                      </ol>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-semibold text-[#eee8da]">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => <em>{children}</em>,
                    link: ({ children, value }) => (
                      <a
                        href={value?.href}
                        target={value?.blank ? '_blank' : undefined}
                        rel={
                          value?.blank
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="underline underline-offset-4 hover:text-white"
                      >
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            </div>
          )}

          {/* ADDITIONAL IMAGE GALLERY */}
          {article.gallery && article.gallery.length > 0 && (
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {article.gallery.map((image, index) =>
                image.asset?._ref ? (
                  <img
                    key={image.asset._ref || index}
                    src={urlFor(image).width(1000).quality(85).url()}
                    alt={image.alt || `${article.title} — image ${index + 1}`}
                    loading="lazy"
                    className="w-full rounded-lg border border-[#294052] object-cover"
                  />
                ) : null
              )}
            </div>
          )}

          {/* VIDEO */}
          {article.videoUrl && (
            <div className="mt-12 border-t border-[#294052] pt-8">
              <p className="mb-4 text-xs tracking-[0.18em] text-[#bdb5a5]">
                WATCH VIDEO
              </p>
              <a
                href={article.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-[#eee8da] px-6 py-3 text-xs tracking-[0.15em] transition hover:bg-[#eee8da] hover:text-[#071827]"
              >
                OPEN VIDEO ↗
              </a>
            </div>
          )}

          {/* BACK TO SECTION */}
          <div className="mt-16 border-t border-[#294052] pt-8">
            <Link
              href={`/${section}`}
              className="text-xs tracking-[0.15em] text-[#bdb5a5] transition-colors hover:text-[#eee8da]"
            >
              ← MORE {sectionName}
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <Suspense fallback={<ArticleFallback />}>
      <ArticleContent params={params} />
    </Suspense>
  )
}