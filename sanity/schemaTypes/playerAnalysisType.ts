import { defineField, defineType } from 'sanity'

export const playerAnalysisType = defineType({
    name: 'playerAnalysis',
    title: 'Player Analysis',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Analysis Title',
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
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
        }),

        defineField({
            name: 'publishedAt',
            title: 'Publication Date',
            type: 'datetime',
        }),

        defineField({
            name: 'analysisType',
            title: 'Analysis Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Playing Style', value: 'playingStyle' },
                    { title: 'Tactical Analysis', value: 'tactical' },
                    { title: 'Technical Analysis', value: 'technical' },
                    { title: 'Match-Based Analysis', value: 'matchBased' },
                ],
            },
        }),

        defineField({
            name: 'videoUrl',
            title: 'Analysis Video URL',
            type: 'url',
        }),

        defineField({
            name: 'body',
            title: 'Full Analysis',
            type: 'blockContent',
        }),

        defineField({
            name: 'featured',
            title: 'Featured Analysis',
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