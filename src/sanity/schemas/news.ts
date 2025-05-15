// schemas/news.ts

const news = {
  name: "news",
  title: "News & Updates",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "date", title: "Date", type: "datetime" },
    { name: "content", title: "Content", type: "array", of: [{ type: "block" }] },
  ],
};

export default news;
