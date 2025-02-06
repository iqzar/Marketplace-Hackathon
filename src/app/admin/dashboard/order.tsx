import React, { useEffect, useState } from 'react';
import fetchOrders from '../../../lib/fetchOrders'; // Import the fetch function for orders

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  cartItems: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  orderDate: string;
  totalAmount: number;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    const data = await fetchOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <main className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg md:text-2xl font-semibold">All Orders</h1>
      </div>

      <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200 shadow-md">
  <thead>
    <tr className="bg-gray-100">
      <th className="border p-3">No</th> {/* New column for order count */}
      <th className="border p-3">Order ID</th>
      <th className="border p-3">Customer Name</th>
      <th className="border p-3">Address</th>
      <th className="border p-3">Total Amount</th>
      <th className="border p-3">Order Date</th>
      <th className="border p-3">Cart Items</th>
    </tr>
  </thead>
  <tbody>
    {orders.map((order, index) => (
      <tr key={order._id} className="text-center">
        <td className="border p-3">{index + 1}</td> {/* Order number (row number) */}
        <td className="border p-2 text-[12px] font-semibold">{order._id}</td>
        <td className="border p-2 text-[12px] font-semibold">{order.firstName} {order.lastName}</td>
        <td className="border p-2 text-[12px] font-semibold">{order.address}</td>
        <td className="border p-2 text-[12px] font-semibold">${order.totalAmount}</td>
        <td className="border p-2 text-[12px] font-semibold">{new Date(order.orderDate).toLocaleString()}</td>
        <td className="border p-2 text-[12px] font-semibold">
          <ul>
            {order.cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x ${item.price}
              </li>
            ))}
          </ul>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </main>
  );
};

export default Orders;
