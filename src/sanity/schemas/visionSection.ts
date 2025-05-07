const visionSection = {
    name: 'visionSection',
    title: 'Vision Section',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
      { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }
    ]
  };
  
  export default visionSection;
  