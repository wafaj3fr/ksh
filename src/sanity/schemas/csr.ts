// schemas/csr.ts

const csr = {
  name: "csr",
  title: "CSR Initiatives",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
    {
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Project Name", type: "string" },
            { name: "impact", title: "Impact", type: "text" },
          ],
        },
      ],
    },
  ],
};

export default csr;
