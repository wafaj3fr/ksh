const ceoMessage = {
    name: 'ceoMessage',
    title: 'CEO Message',
    type: 'document',
    fields: [
      { name: 'heading', title: 'Heading', type: 'string', validation: Rule => Rule.required() },
      { name: 'message', title: 'Message', type: 'array', of: [{ type: 'block' }] }
    ]
  };
  
  export default ceoMessage;
  