const settings = {
  name: "settings",
  title: "Website Settings",
  type: "document",
  fields: [
    {
      name: "language",
      type: "string",
      hidden: true,
    },
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

    // 🟡 نوع الوسائط: صورة أو فيديو
    {
      name: "heroMediaType",
      title: "Hero Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "image",
    },

    // 🟢 صورة الهيرو (تظهر فقط لو اخترت image)
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      hidden: ({ parent }) => parent?.heroMediaType !== "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    },

    // 🟠 نوع الفيديو: رابط أو رفع
    {
      name: "videoSource",
      title: "Video Source",
      type: "string",
      options: {
        list: [
          { title: "Upload File", value: "file" },
          { title: "Embed URL", value: "url" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      hidden: ({ parent }) => parent?.heroMediaType !== "video",
    },

    // 🔵 رفع ملف الفيديو (لو اخترت file)
    {
      name: "heroVideoFile",
      title: "Hero Video File",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
      hidden: ({ parent }) =>
        parent?.heroMediaType !== "video" || parent?.videoSource !== "file",
    },

    // 🔴 رابط الفيديو (لو اخترت url)
    {
      name: "heroVideoUrl",
      title: "Hero Video URL",
      type: "url",
      hidden: ({ parent }) =>
        parent?.heroMediaType !== "video" || parent?.videoSource !== "url",
      description: "YouTube/Vimeo embed link",
    },

    // باقي الحقول
    {
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    },
    {
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
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
