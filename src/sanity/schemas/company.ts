// schemas/company.ts
const company = {
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: Rule => Rule.required()
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo'
    }
  }
};

export default company;