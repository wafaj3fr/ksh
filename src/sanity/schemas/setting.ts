// schemas/settings.ts

import { init } from "next/dist/compiled/webpack/webpack";

const settings = {
  name: "settings",
  title: "WebsiteSettings",
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
      name: "heroMediaImage",
      title: "Hero Media Image",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
          { title: "Audio", value: "audio" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "image",
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      hidden: ({ parent }) => parent?.heroMediaImage !== "image",
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
      name: "heroVideoFile",
      title: "Hero Video File",
      type: "file",
      hidden: ({ parent }) => parent?.heroMediaType !== "videoFile",
      options: {
        accept: "video/mp4,video/webm",
      },
    },
    {
      name: "heroVideoUrl",
      title: "Hero Video URL",
      type: "url",
      hidden: ({ parent }) => parent?.heroMediaType !== "videoUrl",
      description: "e.g. YouTube or Vimeo embed link",
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
    {
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        { name: "phone", title: "Phone", type: "string" },
        { name: "email", title: "Email", type: "string" },
        { name: "address", title: "Address", type: "string" },
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
    },
  ],
  preview: {
    select: {
      title: "heroTitle",
      media: "logo",
    },
    prepare({ title, media }) {
      return {
        title: title || "Website Settings",
        media,
      };
    },
  },
};

export default settings;