"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut } from "lucide-react";
import Image from "next/image";
import AllProducts from "./products";
import Orders from "./order";
import DashboardStats from "./dashboard";
import ProtectedRoute from "./protectedRoute";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login flag
    router.push("/admin"); // Redirect to login page
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
    { name: "Products", icon: Package, key: "products" },
    { name: "Orders", icon: ShoppingCart, key: "orders" },
    { name: "Customers", icon: Users, key: "customers" },
  ];

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
          </div>

          <nav className="flex flex-col space-y-4">
            {menuItems.map(({ name, icon: Icon, key }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-3 text-gray-700 px-4 py-2 rounded-md transition ${
                  activeTab === key ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
              >
                <Icon className="w-5 h-5" />
                {name}
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="mt-auto">
            <button
              onClick={handleLogout} // Call the logout function
              className="flex items-center gap-3 text-red-500 px-4 py-2 hover:bg-red-100 rounded-md w-full"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>

          <div className="bg-white shadow-md p-6 rounded-lg">
            {activeTab === "dashboard" && <DashboardStats />}
            {activeTab === "products" && <AllProducts />}
            {activeTab === "orders" && <Orders />}
            {activeTab === "customers" && <p>Manage customer details.</p>}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
