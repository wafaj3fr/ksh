import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'job',
  title: 'Job',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'department', type: 'string', title: 'Department/Company' }), // لبطاقة Current Openings
    defineField({ name: 'location', type: 'string', title: 'Location' }),
    defineField({ name: 'type', type: 'string', title: 'Type', options: { list: ['Full-time','Part-time','Contract','Internship','Remote','Hybrid'] } }),
    defineField({ name: 'deadline', type: 'date', title: 'Application Deadline' }), // يظهر في البطاقة
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }], title: 'Description' }),
    defineField({ name: 'requirements', type: 'array', of: [{ type: 'block' }], title: 'Requirements' }),
    defineField({ name: 'category', type: 'string', title: 'Category', options: { list: ['Engineering','Product','Design','Operations','Other'] } }),
  ],
});
