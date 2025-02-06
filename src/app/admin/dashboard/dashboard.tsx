import React, { useState, useEffect } from 'react';
import { FaBox, FaShoppingCart, FaUserAlt, FaDollarSign } from 'react-icons/fa';
import { client } from '../../../sanity/lib/client'; // Import the sanity client

interface Stat {
  title: string;
  count: number;
  icon: JSX.Element;
}

const DashboardStats: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([
    { title: 'Products', count: 0, icon: <FaBox size={24} /> },
    { title: 'Orders', count: 0, icon: <FaShoppingCart size={24} /> },
    { title: 'Customers', count: 0, icon: <FaUserAlt size={24} /> },
    { title: 'Payments', count: 0, icon: <FaDollarSign size={24} /> },
  ]);

  useEffect(() => {
    fetchProductCount();
    fetchOrderCount();
    fetchCustomerCount();
    fetchPaymentCount();
  }, []);

  const fetchProductCount = async () => {
    const query = '*[_type == "product"]'; // Adjust to match your Sanity product schema
    const products = await client.fetch(query);
    setStats((prevStats) => {
      const updatedStats = [...prevStats];
      updatedStats[0].count = products.length; // Set the product count
      return updatedStats;
    });
  };

  const fetchOrderCount = async () => {
    const query = '*[_type == "order"]'; // Adjust to match your Sanity order schema
    const orders = await client.fetch(query);
    setStats((prevStats) => {
      const updatedStats = [...prevStats];
      updatedStats[1].count = orders.length; // Set the order count
      return updatedStats;
    });
  };

  const fetchCustomerCount = async () => {
    const customerCount = 80; // Example count, replace with dynamic data
    setStats((prevStats) => {
      const updatedStats = [...prevStats];
      updatedStats[2].count = customerCount;
      return updatedStats;
    });
  };

  const fetchPaymentCount = async () => {
    const paymentCount = 300; // Example count, replace with dynamic data
    setStats((prevStats) => {
      const updatedStats = [...prevStats];
      updatedStats[3].count = paymentCount;
      return updatedStats;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <div className="text-3xl text-side mb-4">{stat.icon}</div>
          <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
          <p className="text-xl font-bold">{stat.count}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
