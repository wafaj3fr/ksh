// src/schemas/investmentSector.ts

const investmentSector = {
  name: "investmentSector",
  title: "Investment Sector",
  type: "document",
  fields: [
    {
      name: "language",
      type: "string",
      hidden: true,
    },
    {
      name: "title",
      title: "Sector Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Icon name from lucide-react or a custom icon URL",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};

export default investmentSector;
