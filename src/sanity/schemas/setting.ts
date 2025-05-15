// schemas/settings.ts

const settings = {
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    {
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        { name: "phone", title: "Phone", type: "string" },
        { name: "email", title: "Email", type: "string" },
        { name: "address", title: "Address", type: "string" },
      ],
    },
    {
      name: "socialMedia",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Platform", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    },
  ],
};

export default settings;