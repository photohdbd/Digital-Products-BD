import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { HeroSlide } from '../types';
import Modal from '../components/Modal';
import AdminHeroForm from './AdminHeroForm';

const AdminHeroPage: React.FC = () => {
  const context = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | undefined>(undefined);

  if (!context) return null;
  const { heroSlides, deleteHeroSlide } = context;

  const openAddModal = () => {
    setEditingSlide(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSlide(undefined);
  };

  const handleDelete = (slideId: string, slideTitle: string) => {
    if (window.confirm(`Are you sure you want to delete the slide "${slideTitle}"?`)) {
      deleteHeroSlide(slideId);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Hero Section Slides</h1>
        <button onClick={openAddModal} className="bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg">
          Add New Slide
        </button>
      </div>

      <div className="bg-base-200 rounded-xl shadow-subtle overflow-x-auto border border-base-300">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-base-300">
              <th className="p-4 font-semibold text-gray-400">Image</th>
              <th className="p-4 font-semibold text-gray-400">Title</th>
              <th className="p-4 font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {heroSlides.map(slide => (
              <tr key={slide.id} className="border-b border-base-300 last:border-0 hover:bg-base-300/50">
                <td className="p-4">
                  <img src={slide.image} alt={slide.title} className="w-24 h-12 object-cover rounded-md bg-white/10" />
                </td>
                <td className="p-4 text-gray-200 font-semibold">{slide.title}</td>
                <td className="p-4 space-x-2">
                  <button onClick={() => openEditModal(slide)} className="text-blue-400 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(slide.id, slide.title)} className="text-red-400 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingSlide ? 'Edit Slide' : 'Add New Slide'}>
        <AdminHeroForm slide={editingSlide} onSave={closeModal} />
      </Modal>
    </div>
  );
};

export default AdminHeroPage;
