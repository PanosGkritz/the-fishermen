
import { defineArrayMember, defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Article',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Short Description',
      description: 'A short introduction shown on article cards.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(250),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      description: 'Select the categories that best fit this article.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'category' }],
        }),
      ],
    }),

    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      description: 'Upload additional images for the article.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      description: 'Paste a YouTube or other video link.',
      type: 'url',
    }),

    defineField({
      name: 'section',
      title: 'Website Section',
      type: 'string',
      options: {
        list: [
          { title: 'Analysis', value: 'analysis' },
          { title: 'Scouting', value: 'scouting' },
          { title: 'Recruitment', value: 'recruitment' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'analysisCategory',
      title: 'Analysis Category',
      description: 'Choose which Analysis category should display this article.',
      type: 'string',
      options: {
        list: [
          { title: 'Team Analysis', value: 'teamAnalysis' },
          { title: 'Match Analysis', value: 'matchAnalysis' },
          { title: 'Data & Performance', value: 'dataPerformance' },
        ],
        layout: 'radio',
      },
      hidden: ({ parent }) => parent?.section !== 'analysis',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as
            | { section?: string }
            | undefined

          if (parent?.section === 'analysis' && !value) {
            return 'Choose an Analysis Category.'
          }

          return true
        }),
    }),

    defineField({
      name: 'recruitmentCategory',
      title: 'Recruitment Category',
      description:
        'Choose which Recruitment page should display this article.',
      type: 'string',
      options: {
        list: [
          { title: 'Recruitment Analysis', value: 'recruitmentAnalysis' },
          { title: 'Market Opportunities', value: 'marketOpportunities' },
        ],
        layout: 'radio',
      },
      hidden: ({ parent }) => parent?.section !== 'recruitment',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as
            | { section?: string }
            | undefined

          if (parent?.section === 'recruitment' && !value) {
            return 'Choose a Recruitment Category.'
          }

          return true
        }),
    }),

    defineField({
      name: 'featured',
      title: 'Featured Article',
      description:
        'Select this to feature the article at the top of its section.',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'body',
      title: 'Article Content',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      section: 'section',
      analysisCategory: 'analysisCategory',
      recruitmentCategory: 'recruitmentCategory',
      media: 'mainImage',
    },
    prepare({
      title,
      section,
      analysisCategory,
      recruitmentCategory,
      media,
    }) {
      const categoryLabel =
        section === 'analysis'
          ? analysisCategory === 'teamAnalysis'
            ? 'TEAM ANALYSIS'
            : analysisCategory === 'matchAnalysis'
              ? 'MATCH ANALYSIS'
              : analysisCategory === 'dataPerformance'
                ? 'DATA & PERFORMANCE'
                : 'ANALYSIS — NO CATEGORY'
          : section === 'recruitment'
            ? recruitmentCategory === 'recruitmentAnalysis'
              ? 'RECRUITMENT ANALYSIS'
              : recruitmentCategory === 'marketOpportunities'
                ? 'MARKET OPPORTUNITIES'
                : 'RECRUITMENT — NO CATEGORY'
            : section
              ? section.toUpperCase()
              : 'NO SECTION SELECTED'

      return {
        title: title || 'Untitled Article',
        subtitle: categoryLabel,
        media,
      }
    },
  },
})
