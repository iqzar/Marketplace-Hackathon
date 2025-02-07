import React, { useEffect, useState } from 'react';
import fetchProducts from '@/lib/fetchProduct';
import AddProduct from './addProduct';
import Image from 'next/image';

interface Product {
  _id: string;
  productName: string;
  image: string; // This should be an object containing image information from Sanity
  color: string;
  price: number;
  size: string;
  status: string;
  inventory: number;
  description: string;
  category: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg md:text-2xl font-semibold">All Products</h1>
        <button onClick={() => setShowAddModal(true)} className="bg-side text-white px-4 py-2 rounded-md hover:bg-med">
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-med shadow-md">
  <thead>
    <tr className="bg-med">
      <th className="border p-3">No</th> {/* New Column for No */}
      <th className="border p-3">Image</th>
      <th className="border p-3">Name</th>
      <th className="border p-3">Category</th>
      <th className="border p-3">Color</th>
      <th className="border p-3">Price</th>
      <th className="border p-3 hidden md:table-cell">Size</th>
      <th className="border p-3 hidden md:table-cell">Status</th>
      <th className="border p-3">Inventory</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product, index) => (
      <tr key={product._id} className="text-center">
        <td className="border p-3">{index + 1}</td> {/* Display index + 1 as the row number */}
        <td className="border p-3">
          {/* Use urlFor to get the image URL */}
          <Image
           src={product.image || "/path/to/fallback-image.jpg"} // Ensure the image field is passed correctly
            alt={product.productName}
            width={200}
            height={200}
            className="w-12 h-12 object-cover mx-auto"
          />
        </td>
        <td className="border p-2 text-[12px] font-semibold">{product.productName}</td>
        <td className="border p-2 text-[12px] font-semibold">{product.category}</td>
        <td className="border p-2 text-[12px] font-semibold">{product.color}</td>
        <td className="border p-2 text-[12px] font-semibold">${product.price}</td>
        <td className="border p-2 hidden md:table-cell text-[12px] font-semibold">{product.size}</td>
        <td className="border p-2 hidden md:table-cell text-[12px] font-semibold">{product.status}</td>
        <td className="border p-2 text-[12px] font-semibold">{product.inventory}</td>
      </tr>
    ))}
  </tbody>
</table>
      </div>

      {/* Modal to Add Product */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
            <AddProduct onClose={() => setShowAddModal(false)} refreshProducts={loadProducts} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Products;
