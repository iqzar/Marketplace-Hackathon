import React from "react";
import Link from "next/link";

interface SidebarProps {
  onCategorySelect: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCategorySelect }) => {
  const menuItems = [
    
    { id: 1, label: "Men's Shoe" },
    { id: 2, label: "Women's Shoes" },
    { id: 3, label: "Tops & T-shirts" },
    { id: 4, label: "Kid's Sweatshirt" },
    { id: 5, label: "Jackets" },
    { id: 6, label: "Trousers & Tights" },
    { id: 7, label: "Shorts" },
    { id: 8, label: "Track Suits" },
    { id: 9, label: "Jumpsuits & Rompers" },
    { id: 10, label: "Skirts & Dresses" },
    { id: 11, label: "Socks" },
    { id: 12, label: "Accessories" },
  ];

  return (
    <div className="w-full lg:w-64 p-4">
      <ul className="space-y-3 mt-3 text-sm border-r border-gray-300">
        <li><Link href='/allproducts'>All Products</Link></li>
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => onCategorySelect(item.label)}
            className="flex justify-between items-center text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
