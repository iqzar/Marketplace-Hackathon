export const orders = {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'firstName',
        title: 'First Name',
        type: 'string',
      },
      {
        name: 'lastName',
        title: 'Last Name',
        type: 'string',
      },
      {
        name: 'address',
        title: 'Address',
        type: 'object',
        fields: [
          {
            name: 'addressLine1',
            title: 'Address Line 1',
            type: 'string',
          },
          {
            name: 'addressLine2',
            title: 'Address Line 2',
            type: 'string',
          },
          {
            name: 'addressLine3',
            title: 'Address Line 3',
            type: 'string',
          },
          {
            name: 'postalCode',
            title: 'Postal Code',
            type: 'string',
          },
          {
            name: 'locality',
            title: 'Locality',
            type: 'string',
          },
          {
            name: 'state',
            title: 'State',
            type: 'string',
          },
        ],
      },
      {
        name: 'products',
        title: 'Products',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'productName',
                title: 'Product Name',
                type: 'string',
              },
              {
                name: 'productImage',
                title: 'Product Image',
                type: 'image',
                options: {
                  hotspot: true,
                },
              },
              {
                name: 'size',
                title: 'Size',
                type: 'string',
              },
              {
                name: 'price',
                title: 'Price',
                type: 'number',
              },
              {
                name: 'quantity',
                title: 'Quantity',
                type: 'number',
              },
              {
                name: 'total',
                title: 'Total',
                type: 'number',
              },
            ],
          },
        ],
      },
      {
        name: 'orderDate',
        title: 'Order Date',
        type: 'datetime',
      },
      {
        name: 'totalAmount',
        title: 'Total Amount',
        type: 'number',
      },
    ],
  };
  