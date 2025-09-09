import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'careersPage',
  title: 'Careers Page',
  type: 'document',
  fields: [
    // Hero
    defineField({ name: 'title', type: 'string', title: 'Hero Title' }),
    defineField({ name: 'intro', type: 'text', title: 'Hero Subtitle' }),

    // Units (Business Units)
    defineField({ name: 'unitsHeading', type: 'string', title: 'Units Heading (optional)' }),
    defineField({ name: 'unitsSubtext', type: 'text', title: 'Units Subtext (optional)' }),
    defineField({
      name: 'units',
      title: 'Business Units',
      type: 'array',
      of: [
        defineField({
          name: 'unit',
          type: 'object',
          title: 'Unit',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'subtitle', type: 'string', title: 'Subtext (optional)' },
            { name: 'description', type: 'text', title: 'Description (optional)' },
            {
              name: 'logo',
              title: 'Logo (optional)',
              type: 'image',
              options: { hotspot: true },
            },
          ],
          preview: { select: { title: 'title', media: 'logo' } },
        }),
      ],
    }),

    // WHY WORK WITH US (الحقل الوحيد الجديد)
    defineField({ name: 'whyWorkHeading', type: 'string', title: 'Why Work With Us Heading (optional)' }),
    defineField({
      name: 'whyWorkItems',
      title: 'Why Work With Us (items)',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          type: 'object',
          title: 'Item',
          fields: [
            { name: 'text', type: 'string', title: 'Text' },
            {
              name: 'iconKey',
              type: 'string',
              title: 'Icon Key (optional)',
              options: {
                list: [
                  { title: 'target', value: 'target' },
                  { title: 'briefcase', value: 'briefcase' },
                  { title: 'lightbulb', value: 'lightbulb' },
                  { title: 'rocket', value: 'rocket' },
                  { title: 'users', value: 'users' },
                  { title: 'trophy', value: 'trophy' },
                  { title: 'shield', value: 'shield' },
                  { title: 'handshake', value: 'handshake' },
                  { title: 'layers', value: 'layers' },
                  { title: 'globe', value: 'globe' },
                  { title: 'growth', value: 'growth' },
                ],
              },
            },
          ],
          preview: { select: { title: 'text' } },
        }),
      ],
    }),

    // Jobs section
    defineField({ name: 'jobsHeading', type: 'string', title: 'Jobs Heading (optional)' }),
    defineField({ name: 'jobsSubtext', type: 'text', title: 'Jobs Subtext (optional)' }),
    defineField({ name: 'emptyState', type: 'text', title: 'Empty State Message' }),

    // Internships
    defineField({ name: 'internshipTitle', type: 'string', title: 'Internship Title (optional)' }),
    defineField({ name: 'internshipBody', type: 'text', title: 'Internship Body (optional)' }),

    // How to apply
    defineField({ name: 'howToApplyTitle', type: 'string', title: 'How To Apply Title (optional)' }),
    defineField({
      name: 'howToApplySteps',
      title: 'How To Apply Steps',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // HR
    defineField({
      name: 'hr',
      title: 'HR Contact',
      type: 'object',
      fields: [
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'whatsapp', type: 'string', title: 'WhatsApp (optional)' },
      ],
    }),

  ],
});
