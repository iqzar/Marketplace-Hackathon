export const category = {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      {
        name: 'id',
        title: 'ID',
        type: 'string',
      },
      {
        name: 'men',
        title: 'Men',
        type: 'object',
        fields: [
          {
            name: 'numberOfItems',
            title: 'Number of Items',
            type: 'number',
          },
        ],
      },
      {
        name: 'women',
        title: 'Women',
        type: 'object',
        fields: [
          {
            name: 'numberOfItems',
            title: 'Number of Items',
            type: 'number',
          },
        ],
      },
      {
        name: 'kids',
        title: 'Kids',
        type: 'object',
        fields: [
          {
            name: 'numberOfItems',
            title: 'Number of Items',
            type: 'number',
          },
        ],
      },
    ],
  };
  