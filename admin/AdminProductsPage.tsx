import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Product } from '../types';
import Modal from '../components/Modal';
import AdminProductForm from './AdminProductForm';

const AdminProductsPage: React.FC = () => {
  const context = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  if (!context) return null;
  const { products, toggleProductStatus, deleteProduct } = context;

  const openAddModal = () => {
    setEditingProduct(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(undefined);
  };
  
  const handleDelete = (productId: string, productName: string) => {
    if (window.confirm(`Are you sure you want to permanently delete "${productName}"? This action cannot be undone.`)) {
        deleteProduct(productId);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Product Management</h1>
        <button onClick={openAddModal} className="bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg">
          Add New Product
        </button>
      </div>

      <div className="bg-base-200 rounded-xl shadow-subtle overflow-x-auto border border-base-300">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-base-300">
              <th className="p-4 font-semibold text-gray-400">Name</th>
              <th className="p-4 font-semibold text-gray-400">Category</th>
              <th className="p-4 font-semibold text-gray-400">Price</th>
              <th className="p-4 font-semibold text-gray-400">Status</th>
              <th className="p-4 font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-base-300 last:border-0 hover:bg-base-300/50">
                <td className="p-4 text-gray-200 font-semibold">{product.name}</td>
                <td className="p-4 text-gray-400">{product.category}</td>
                <td className="p-4 text-gray-200">৳{product.price.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.isLive ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'}`}>
                    {product.isLive ? 'Live' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  <button onClick={() => openEditModal(product)} className="text-blue-400 hover:underline">Edit</button>
                  <button onClick={() => toggleProductStatus(product.id)} className="text-yellow-400 hover:underline">
                    {product.isLive ? 'Disable' : 'Enable'}
                  </button>
                  <button onClick={() => handleDelete(product.id, product.name)} className="text-red-400 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingProduct ? 'Edit Product' : 'Add New Product'}>
        <AdminProductForm product={editingProduct} onSave={closeModal} />
      </Modal>
    </div>
  );
};

export default AdminProductsPage;