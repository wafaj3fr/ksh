const whyUs = {
    name: 'whyUs',
    title: 'Why Us',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'points', title: 'Points', type: 'array', of: [{ type: 'string' }] }
    ]
  };
  
  export default whyUs;
  