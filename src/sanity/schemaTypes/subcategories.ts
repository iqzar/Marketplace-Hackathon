export const subcategory = {
  name: 'subcategory',
  title: 'Subcategory',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'subcategory Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'category',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}
