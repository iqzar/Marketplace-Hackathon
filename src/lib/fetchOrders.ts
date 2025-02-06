import { client } from '../sanity/lib/client';

const fetchOrders = async () => {
  const query = `*[_type == "order"]`; // Fetch orders from your Sanity project
  const orders = await client.fetch(query);
  return orders;
};

export default fetchOrders;
