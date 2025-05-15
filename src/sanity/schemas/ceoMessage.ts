// schemas/ceoMessage.ts

const ceoMessage = {
  name: "ceoMessage",
  title: "CEO Message",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "message", title: "Message", type: "text" },
    {
      name: "image",
      title: "CEO Image",
      type: "image",
      options: { hotspot: true },
    },
  ],
};

export default ceoMessage;
