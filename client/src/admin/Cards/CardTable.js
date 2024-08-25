import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function CardTable({ color }) {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    imageSrc: "",
    imageAlt: "",
    categoryName: "",
    price: 0
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5066/api/Products");
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
        await axios.delete(`http://localhost:5066/api/Products/${productId}`, {
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

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await axios.put(`http://localhost:5066/api/Products/${updatedProduct.id}`, updatedProduct, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
      setShowEditForm(false);
      setEditProduct(null);
      alert("Product updated successfully.");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product.");
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post(`http://localhost:5066/api/Products`, newProduct, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProducts([...products, newProduct]);
      setShowAddForm(false);
      setNewProduct({
        name: "",
        imageSrc: "",
        imageAlt: "",
        categoryName: "",
        price: 0
      });
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
                    src={product.imageSrc}
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
                  <label className="block text-sm font-medium text-gray-700">Image Source</label>
                  <input
                    type="text"
                    value={newProduct.imageSrc}
                    onChange={(e) => setNewProduct({ ...newProduct, imageSrc: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
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
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleAddProduct}
                    className="inline-flex justify-center px-4 py-2 text-white bg-blue-500 border border-transparent rounded-md shadow-sm"
                  >
                    Add Product
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewProduct({
                        name: "",
                        imageSrc: "",
                        imageAlt: "",
                        categoryName: "",
                        price: 0
                      });
                    }}
                    className="inline-flex justify-center px-4 py-2 text-white bg-red-500 border border-transparent rounded-md shadow-sm"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateProduct(editProduct);
                  }}
                >
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
                    <label className="block text-sm font-medium text-gray-700">Image Source</label>
                    <input
                      type="text"
                      value={editProduct.imageSrc}
                      onChange={(e) => setEditProduct({ ...editProduct, imageSrc: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                    />
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
                      onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-white bg-blue-500 border border-transparent rounded-md shadow-sm"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditForm(false);
                        setEditProduct(null);
                      }}
                      className="inline-flex justify-center px-4 py-2 text-white bg-red-500 border border-transparent rounded-md shadow-sm"
                    >
                      Cancel
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

CardTable.propTypes = {
  color: PropTypes.string
};
