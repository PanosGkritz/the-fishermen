import { defineField, defineType } from 'sanity'

export const scoutingReportType = defineType({
    name: 'scoutingReport',
    title: 'Scouting Reports',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Report Title',
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
            name: 'player',
            title: 'Player',
            type: 'reference',
            to: [{ type: 'player' }],
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'excerpt',
            title: 'Short Summary',
            type: 'text',
        }),

        defineField({
            name: 'mainImage',
            title: 'Report Cover Image',
            type: 'image',
            options: { hotspot: true },
        }),

        defineField({
            name: 'publishedAt',
            title: 'Publication Date',
            type: 'datetime',
        }),

        defineField({
            name: 'lastWatchedMatch',
            title: 'Last Watched Match',
            type: 'string',
        }),

        defineField({
            name: 'season',
            title: 'Season',
            type: 'string',
        }),

        defineField({
            name: 'strengths',
            title: 'Strengths',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        defineField({
            name: 'weaknesses',
            title: 'Weaknesses',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        defineField({
            name: 'developmentAreas',
            title: 'Development Areas',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        defineField({
            name: 'roleFit',
            title: 'Tactical Role & Suitability',
            type: 'text',
        }),

        defineField({
            name: 'recommendation',
            title: 'Scouting Recommendation',
            type: 'text',
        }),

        defineField({
            name: 'ratings',
            title: 'Scouting Ratings (1–10)',
            type: 'object',
            fields: [
                defineField({
                    name: 'technical',
                    title: 'Technical',
                    type: 'number',
                    validation: (Rule) => Rule.min(1).max(10),
                }),
                defineField({
                    name: 'tactical',
                    title: 'Tactical',
                    type: 'number',
                    validation: (Rule) => Rule.min(1).max(10),
                }),
                defineField({
                    name: 'physical',
                    title: 'Physical',
                    type: 'number',
                    validation: (Rule) => Rule.min(1).max(10),
                }),
                defineField({
                    name: 'mental',
                    title: 'Mental',
                    type: 'number',
                    validation: (Rule) => Rule.min(1).max(10),
                }),
            ],
        }),

        defineField({
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
        }),

        defineField({
            name: 'body',
            title: 'Full Scouting Report',
            type: 'blockContent',
        }),

        defineField({
            name: 'featured',
            title: 'Featured Report',
            type: 'boolean',
            initialValue: false,
        }),
    ],

    preview: {
        select: {
            title: 'title',
            subtitle: 'player.name',
            media: 'mainImage',
        },
    },
})