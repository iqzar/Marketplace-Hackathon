"use client";

import { useState } from "react";
import { client } from "../../../sanity/lib/client";
import Image from 'next/image';
// Define props interface
interface AddProductProps {
  onClose: () => void;
  refreshProducts: () => Promise<void>;
}

const AddProduct: React.FC<AddProductProps> = ({ onClose, refreshProducts }) => {
  const [productData, setProductData] = useState({
    productName: "",
    category: "",
    price: "",
    inventory: "",
    colors: "",
    size: "",
    status: "",
    description: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Handle image upload preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0])); // Show preview
    }
  };

  // Upload Image to Sanity
  const uploadImage = async () => {
    if (!image) return null;

    // Upload image to Sanity
    const uploadedImage = await client.assets.upload('image', image, {
      contentType: image.type,
      filename: image.name,
    });

    return uploadedImage; // Returns the uploaded image object with reference
  };
// handle cancel
const handleClose = () => {
  setProductData({
    productName: "",
    category: "",
    price: "",
    inventory: "",
    colors: "",
    size: "",
    status: "",
    description: "",
  });
  setImage(null);
  setPreview(null);
  onClose(); // Close the form
};
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const uploadedImage = await uploadImage(); // Get the uploaded image object
  
      if (!uploadedImage) {
        alert("Image upload failed or image not provided.");
        return; // Early return if the image upload failed
      }
  
      const newProduct = {
        _type: "product",
        productName: productData.productName,
        category: productData.category,
        price: Number(productData.price),
        inventory: Number(productData.inventory),
        colors: productData.colors.split(",").map((color) => color.trim()),
        size: productData.size.split(",").map((size) => size.trim()),
        status: productData.status,
        description: productData.description,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: uploadedImage._id, // Reference the uploaded image asset
          },
        },
      };
  
      await client.create(newProduct);
      alert("Product added successfully!");
  
      await refreshProducts(); // Refresh product list
      onClose(); // Close modal or form after submission
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="w-full max-w-xs p-3 bg-white rounded-md shadow-md">
  <h2 className="text-lg font-semibold mb-3 text-gray-800 text-center">Add Product</h2>
  <form onSubmit={handleSubmit} className="flex flex-col gap-2">
    <input
      type="text"
      name="productName"
      placeholder="Product Name"
      onChange={handleChange}
      required
      className="w-full p-1.5 text-sm border rounded focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="text"
      name="category"
      placeholder="Category"
      onChange={handleChange}
      required
      className="w-full p-1.5 text-sm border rounded focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="number"
      name="price"
      placeholder="Price"
      onChange={handleChange}
      required
      className="w-full p-1.5 text-sm border rounded focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="number"
      name="inventory"
      placeholder="Inventory"
      onChange={handleChange}
      required
      className="w-full p-1.5 text-sm border rounded focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="text"
      name="colors"
      placeholder="Colors (comma-separated)"
      onChange={handleChange}
      required
      className="w-full p-1.5 text-sm border rounded focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="text"
      name="size"
      placeholder="Sizes (comma-separated)"
      onChange={handleChange}
      required
      className="w-full p-1.5 text-sm border rounded focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="text"
      name="status"
      placeholder="Status (e.g., Available, Sold Out)"
      onChange={handleChange}
      required
      className="w-full p-1.5 text-sm border rounded focus:ring-2 focus:ring-blue-500"
    />
    <textarea
      name="description"
      placeholder="Description"
      onChange={handleChange}
      required
      className="w-full p-1.5 text-sm border rounded focus:ring-2 focus:ring-blue-500"
    />

    {/* Image Upload */}
    <div className="flex flex-col items-center gap-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="p-1 text-sm border rounded w-full"
        required
      />
      {preview && (
        <div className="relative w-12 h-12">
          <Image
            src={preview}
            alt="Preview"
            layout="fill"
            className="rounded object-cover"
          />
        </div>
      )}
    </div>

    {/* Buttons: Submit & Cancel */}
    <div className="flex justify-between mt-2">
      <button type="button" onClick={handleClose} className="w-[48%] bg-gray-500 text-white py-1.5 text-sm rounded hover:bg-gray-600">
        Cancel
      </button>
      <button type="submit" className="w-[48%] bg-blue-600 text-white py-1.5 text-sm rounded hover:bg-blue-700">
        Submit
      </button>
    </div>
  </form>
</div>



  );
};

export default AddProduct;
