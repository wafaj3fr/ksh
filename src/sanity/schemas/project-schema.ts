const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required() // Added validation
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Main headline under the title'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: Rule => Rule.required() // Added validation
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
        }
      ]
    },
    {
      name: 'subsidiaries',
      title: 'Subsidiaries',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'company' }],
          options: { disableNew: true } // Prevent creating new companies from here
        }
      ]
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true // Enable image cropping
      }
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility'
        }
      ]
    },
    {
      name: 'ceoMessage',
      title: 'CEO Message',
      type: 'reference',
      to: [{ type: 'ceoMessage' }]
    },
    {
      name: 'visionSection',
      title: 'Vision Section',
      type: 'reference',
      to: [{ type: 'visionSection' }]
    },
    {
      name: 'whyUs',
      title: 'Why Us',
      type: 'reference',
      to: [{ type: 'whyUs' }]
    },
  ],
  // Add preview configuration
  preview: {
    select: {
      title: 'title',
      media: 'logo'
    }
  }
};

export default project;