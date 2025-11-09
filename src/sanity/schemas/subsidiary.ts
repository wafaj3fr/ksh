// schemas/subsidiary.ts

const subsidiary = {
  name: "subsidiary",
  title: "Subsidiary",
  type: "document",
  fields: [
    {
      name: "language",
      type: "string",
      hidden: true,
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "sector",
      title: "Sector",
      type: "string",
      options: {
        list: [
          { title: "Technology", value: "technology" },
          { title: "Real Estate", value: "real-estate" },
          { title: "Logistics", value: "logistics" },
          { title: "Facility Management", value: "facility-management" },
        ],
      },
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().min(10).max(200),
    },
    {
      name: "website",
      title: "Website",
      type: "url",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.regex(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          { name: "email", invert: false }
        ).warning("Invalid email format"),
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
};

export default subsidiary;