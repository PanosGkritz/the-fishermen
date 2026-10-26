
import { defineQuery } from 'next-sanity'

export const latestPostsQuery = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    section,
    featured,
    publishedAt,
    mainImage {
      ...,
      alt
    },
    "authorName": author->name
  }
`)

export const featuredPostsQuery = defineQuery(`
  *[
    _type == "post" &&
    featured == true &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    section,
    publishedAt,
    mainImage {
      ...,
      alt
    },
    "authorName": author->name
  }
`)

export const featuredAnalysisQuery = defineQuery(`
  *[
    _type == "post" &&
    section == "analysis" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] | order(featured desc, publishedAt desc)[0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    section,
    featured,
    publishedAt,
    mainImage {
      ...,
      alt
    },
    "authorName": author->name
  }
`)

export const postsBySectionQuery = defineQuery(`
  *[
    _type == "post" &&
    section == $section &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    section,
    publishedAt,
    mainImage {
      ...,
      alt
    },
    "authorName": author->name
  }
`)

export const postBySlugQuery = defineQuery(`
  *[
    _type == "post" &&
    slug.current == $slug &&
    defined(publishedAt) &&
    publishedAt <= now()
  ][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    section,
    publishedAt,
    videoUrl,
    mainImage {
      ...,
      alt
    },
    gallery[] {
      ...,
      alt
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset,
        alt,
        caption
      },
      _type == "video" => {
        ...,
        asset-> {
          _id,
          url,
          originalFilename,
          mimeType
        },
        caption
      },
      _type == "file" => {
        ...,
        asset-> {
          _id,
          url,
          originalFilename,
          mimeType
        },
        caption
      }
    },
    "authorName": author->name
  }
`)

export const playerProfilesQuery = defineQuery(`
  *[
    _type == "player" &&
    defined(slug.current) &&
    playerStatus != "archived" &&
    count(
      *[
        _type == "scoutingReport" &&
        player._ref == ^._id &&
        defined(slug.current) &&
        defined(publishedAt) &&
        publishedAt <= now()
      ]
    ) > 0
  ] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    club,
    league,
    primaryPosition,
    secondaryPositions,
    photo,
    "latestReport": *[
      _type == "scoutingReport" &&
      player._ref == ^._id &&
      defined(publishedAt) &&
      publishedAt <= now() &&
      defined(slug.current)
    ] | order(publishedAt desc)[0] {
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      lastWatchedMatch,
      season,
      mainImage
    }
  }
`)

export const playerProfileBySlugQuery = defineQuery(`
  *[
    _type == "player" &&
    slug.current == $slug &&
    playerStatus != "archived"
  ][0] {
    _id,
    name,
    "slug": slug.current,
    photo,
    club,
    league,
    primaryPosition,
    secondaryPositions,
    dateOfBirth,
    nationality,
    preferredFoot,
    heightCm,
    lastScoutedAt,
    profileNotes,
    "scoutingReports": *[
      _type == "scoutingReport" &&
      player._ref == ^._id &&
      defined(slug.current) &&
      defined(publishedAt) &&
      publishedAt <= now()
    ] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      lastWatchedMatch,
      season,
      strengths,
      weaknesses,
      developmentAreas,
      roleFit,
      recommendation,
      ratings,
      videoUrl,
      mainImage {
        ...,
        alt
      },
      body[]{
        ...,
        _type == "image" => {
          ...,
          asset,
          alt,
          caption
        }
      }
    }
  }
`)

export const scoutingReportBySlugQuery = defineQuery(`
  *[
    _type == "scoutingReport" &&
    slug.current == $slug &&
    defined(publishedAt) &&
    publishedAt <= now()
  ][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    lastWatchedMatch,
    season,
    strengths,
    weaknesses,
    developmentAreas,
    roleFit,
    recommendation,
    ratings,
    videoUrl,
    mainImage {
      ...,
      alt
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset,
        alt,
        caption
      }
    },
    "player": player-> {
      name,
      "slug": slug.current,
      club,
      league,
      primaryPosition,
      photo
    }
  }
`)

export const playerAnalysisListQuery = defineQuery(`
  *[
    _type == "playerAnalysis" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    analysisType,
    publishedAt,
    featured,
    mainImage {
      ...,
      alt
    },
    "player": player-> {
      name,
      "slug": slug.current,
      club,
      primaryPosition,
      photo
    }
  }
`)

export const playerAnalysisBySlugQuery = defineQuery(`
  *[
    _type == "playerAnalysis" &&
    slug.current == $slug &&
    defined(publishedAt) &&
    publishedAt <= now()
  ][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    analysisType,
    publishedAt,
    videoUrl,
    mainImage {
      ...,
      alt
    },
    body,
    "player": player-> {
      name,
      "slug": slug.current,
      club,
      league,
      primaryPosition,
      photo
    }
  }
`)

export const latestScoutingReportsQuery = defineQuery(`
  *[
    _type == "scoutingReport" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage {
      ...,
      alt
    },
    "player": player-> {
      name,
      "slug": slug.current,
      club,
      primaryPosition
    }
  }
`)

export const featuredPlayersQuery = defineQuery(`
  *[
    _type == "player" &&
    defined(slug.current) &&
    playerStatus != "archived" &&
    count(
      *[
        _type == "scoutingReport" &&
        player._ref == ^._id &&
        defined(slug.current) &&
        defined(publishedAt) &&
        publishedAt <= now()
      ]
    ) > 0
  ] | order(name asc)[0...3] {
    _id,
    name,
    "slug": slug.current,
    club,
    primaryPosition,
    photo
  }
`)

export const latestHomepageContentQuery = defineQuery(`
  *[
    _type in ["post", "scoutingReport", "playerAnalysis"] &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] | order(publishedAt desc)[0...10] {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage {
      ...,
      alt
    },
    "section": select(
      _type == "post" => section,
      _type == "scoutingReport" => "scouting",
      _type == "playerAnalysis" => "scouting"
    )
  }
`)
