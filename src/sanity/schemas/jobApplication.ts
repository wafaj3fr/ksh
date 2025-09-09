import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'jobApplication',
  title: 'Job Application',
  type: 'document',
  fields: [
    defineField({ name: 'job', type: 'reference', to: [{ type: 'job' }], title: 'Job', validation: r => r.required() }),
    defineField({ name: 'fullName', type: 'string', title: 'Full Name', validation: r => r.required() }),
    defineField({ name: 'email', type: 'string', title: 'Email', validation: r => r.required() }),
    defineField({ name: 'phone', type: 'string', title: 'Phone' }),
    defineField({ name: 'coverLetter', type: 'text', title: 'Cover Letter (Text)' }),
    defineField({ 
      name: 'cvFile', title: 'CV File', type: 'file', 
      options: { storeOriginalFilename: true }, validation: r => r.required()
    }),
    defineField({
      name: 'coverLetterFile', title: 'Cover Letter File (optional)', type: 'file',
      options: { storeOriginalFilename: true }
    }),
    defineField({
      name: 'attachments', title: 'Additional Documents', type: 'array',
      of: [{ type: 'file', options: { storeOriginalFilename: true } }]
    }),
    defineField({ name: 'createdAt', type: 'datetime', title: 'Created At' }),
  ],
});
