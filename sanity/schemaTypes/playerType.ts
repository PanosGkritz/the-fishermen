import { defineField, defineType } from 'sanity'

export const playerType = defineType({
    name: 'player',
    title: 'Players',
    type: 'document',

    fields: [
        defineField({
            name: 'name',
            title: 'Player Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'photo',
            title: 'Player Photo',
            type: 'image',
            options: { hotspot: true },
        }),

        defineField({
            name: 'club',
            title: 'Current Club',
            type: 'string',
        }),

        defineField({
            name: 'league',
            title: 'League',
            type: 'string',
        }),

        defineField({
            name: 'primaryPosition',
            title: 'Primary Position',
            type: 'string',
        }),

        defineField({
            name: 'secondaryPositions',
            title: 'Secondary Positions',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        defineField({
            name: 'dateOfBirth',
            title: 'Date of Birth',
            type: 'date',
        }),

        defineField({
            name: 'nationality',
            title: 'Nationality',
            type: 'string',
        }),

        defineField({
            name: 'preferredFoot',
            title: 'Preferred Foot',
            type: 'string',
            options: {
                list: [
                    { title: 'Right', value: 'right' },
                    { title: 'Left', value: 'left' },
                    { title: 'Both', value: 'both' },
                    { title: 'Unknown', value: 'unknown' },
                ],
            },
        }),

        defineField({
            name: 'heightCm',
            title: 'Height (cm)',
            type: 'number',
            validation: (Rule) => Rule.min(100).max(250),
        }),

        defineField({
            name: 'playerStatus',
            title: 'Player Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Active', value: 'active' },
                    { title: 'Archived', value: 'archived' },
                ],
            },
            initialValue: 'active',
        }),

        defineField({
            name: 'lastScoutedAt',
            title: 'Last Scouted Date',
            type: 'date',
        }),

        defineField({
            name: 'profileNotes',
            title: 'Additional Notes',
            type: 'text',
        }),
    ],

    preview: {
        select: {
            title: 'name',
            subtitle: 'club',
            media: 'photo',
        },
    },
})