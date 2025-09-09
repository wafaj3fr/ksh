import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactForm",
  title: "Contact Messages",
  type: "document",
  fields: [
    defineField({ name: "fullName", title: "Full Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "subject", title: "Subject", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({ name: "createdAt", title: "Created At", type: "datetime" }),
  ],
});
