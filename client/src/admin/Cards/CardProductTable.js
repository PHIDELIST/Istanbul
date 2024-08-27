import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { backendUrl } from '../../utils';
export default function CardProductTable({ color }) {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: null,
    imageAlt: "",
    categoryName: "",
    price: 0
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/Products`);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [token]);

  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowEditForm(true);
  };

  const handleDeleteClick = async (productId) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      try {
        await axios.delete(`${backendUrl}/api/Products/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProducts(products.filter(product => product.id !== productId));
        alert("Product deleted successfully.");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product.");
      }
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', editProduct.name);
      formData.append('imageAlt', editProduct.imageAlt);
      formData.append('categoryName', editProduct.categoryName);
      formData.append('price', editProduct.price);
      if (editProduct.image) {
        formData.append('image', editProduct.image);
      }

      await axios.put(`${backendUrl}/api/Products/${editProduct.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setProducts(products.map(product => product.id === editProduct.id ? { ...product, ...editProduct } : product));
      setShowEditForm(false);
      setEditProduct(null);
      alert("Product updated successfully.");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product.");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('imageAlt', newProduct.imageAlt);
      formData.append('categoryName', newProduct.categoryName);
      formData.append('price', newProduct.price);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await axios.post(`${backendUrl}/api/Products`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setProducts([...products, response.data.product]);
      setShowAddForm(false);
      setNewProduct({
        name: "",
        image: null,
        imageAlt: "",
        categoryName: "",
        price: 0
      });
      setSelectedImage(null);
      alert("Product added successfully.");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Product Table */}
      <div className="flex-1 relative overflow-x-auto shadow-md sm:rounded-lg">
        <button
          onClick={() => setShowAddForm(true)}
          className="mb-4 px-4 py-2 text-white bg-green-500 border border-transparent rounded-md shadow-sm"
        >
          Add New Product
        </button>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-gray-300">
                  {product.name}
                </th>
                <td className="px-6 py-4">
                  <img
                    src={`${backendUrl}/${product.imageSrc}`}
                    alt={product.imageAlt}
                    className="h-12 w-12 bg-white rounded-full border"
                  />
                </td>
                <td className="px-6 py-4">{product.categoryName}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    onClick={() => handleEditClick(product)}
                    className="font-medium text-blue-600 dark:text-blue-500"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => handleDeleteClick(product.id)}
                    className="ml-2 font-medium text-red-600 dark:text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Sidebars */}
      {(showEditForm || showAddForm) && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 sm:mx-auto">
            {showAddForm ? (
              <>
                <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
                <form onSubmit={handleAddProduct}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                      type="file"
                      onChange={(e) => {
                        setNewProduct({ ...newProduct, image: e.target.files[0] });
                        setSelectedImage(e.target.files[0]);
                      }}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Image Alt Text</label>
                    <input
                      type="text"
                      value={newProduct.imageAlt}
                      onChange={(e) => setNewProduct({ ...newProduct, imageAlt: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                      type="text"
                      value={newProduct.categoryName}
                      onChange={(e) => setNewProduct({ ...newProduct, categoryName: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 text-white bg-red-500 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-blue-500 rounded-md"
                    >
                      Add Product
                    </button>
                  </div>
                </form>
              </>
            ) : showEditForm && (
              <>
                <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
                <form onSubmit={handleUpdateProduct}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                      type="text"
                      value={editProduct.name}
                      onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                      type="file"
                      onChange={(e) => setEditProduct({ ...editProduct, image: e.target.files[0] })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                    {editProduct.imageSrc && (
                      <img
                        src={editProduct.imageSrc}
                        alt={editProduct.imageAlt}
                        className="mt-2 h-12 w-12 bg-white rounded-full border"
                      />
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Image Alt Text</label>
                    <input
                      type="text"
                      value={editProduct.imageAlt}
                      onChange={(e) => setEditProduct({ ...editProduct, imageAlt: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                      type="text"
                      value={editProduct.categoryName}
                      onChange={(e) => setEditProduct({ ...editProduct, categoryName: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      value={editProduct.price}
                      onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowEditForm(false)}
                      className="px-4 py-2 text-white bg-red-500 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-blue-500 rounded-md"
                    >
                      Update Product
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

CardProductTable.propTypes = {
  color: PropTypes.string,
};
