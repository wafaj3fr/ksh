const project = {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Project Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {source: 'name',}
        },
        {
            name: 'image',
            title: 'Project Image',
            type: 'image',
            options: {hotspot: true,},

            fields: [
                {
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'string',
                }
            ]
        },
        {
            name: 'url',
            title: 'Project URL',
            type: 'url',
        },

        {
            name: 'content',
            title: 'Project Content',
            type: 'array',
            of: [{ type: 'block' }],
        },

    ]
};
export default project;
