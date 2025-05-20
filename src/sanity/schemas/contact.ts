// src/schemas/contact.ts

const contact = {
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "map",
      title: "Map URL",
      type: "url",
      description: "Link to Google Maps or an embedded map",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};

export default contact;
