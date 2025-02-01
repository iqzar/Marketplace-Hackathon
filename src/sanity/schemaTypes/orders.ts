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
      type: 'string',
    },
    {
      name: 'cartItems',
      title: 'Cart Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'Product ID', type: 'string' },
            { name: 'name', title: 'Product Name', type: 'string' },
            { name: 'price', title: 'Price', type: 'number' },
            { name: 'quantity', title: 'Quantity', type: 'number' },
            { name: 'image', title: 'Image', type: 'url' },
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
