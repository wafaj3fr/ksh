const news = {
  name: "news",
  title: "News",
  type: "document",
  fields: [
    {
      name: "language",
      type: "string",
      hidden: true,
    },
    {
      name: "title",
      title: "News Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    },
    {
      name: "content",
      title: "Full Content",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "gallery",
      title: "Additional Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt Text" }
          ]
        }
      ]
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "mainImage",
    },
  },
};

export default news;
