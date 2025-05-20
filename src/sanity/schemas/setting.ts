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
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for the logo image.",
        },
      ],
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for the hero image.",
        },
      ],
    },
    {
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      description: "The title displayed on the hero section of the website.",
    },
    {
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
      description: "The subtitle displayed on the hero section of the website.",
    },
  ],
  preview: {
    select: {
      title: "heroTitle",
      media: "logo",
    },
    prepare({ title, media }) {
      return {
        title: title || "Settings",
        media,
      };
    },
  },
};

export default settings;