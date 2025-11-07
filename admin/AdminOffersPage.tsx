import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { SpecialOffer } from '../types';
import Modal from '../components/Modal';

const AdminOffersPage: React.FC = () => {
  const context = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<SpecialOffer | undefined>(undefined);

  if (!context) return null;
  const { specialOffers, addSpecialOffer, updateSpecialOffer, deleteSpecialOffer } = context;

  const openAddModal = () => {
    setEditingOffer(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (offer: SpecialOffer) => {
    setEditingOffer(offer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingOffer(undefined);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Special Offer Management</h1>
        <button onClick={openAddModal} className="bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg">
          Add New Offer
        </button>
      </div>

      <div className="bg-base-200 rounded-xl shadow-subtle overflow-x-auto border border-base-300">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-base-300">
              <th className="p-4 font-semibold text-gray-400">Title</th>
              <th className="p-4 font-semibold text-gray-400">Subtitle</th>
              <th className="p-4 font-semibold text-gray-400">Link</th>
              <th className="p-4 font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {specialOffers.map(offer => (
              <tr key={offer.id} className="border-b border-base-300 last:border-0 hover:bg-base-300/50">
                <td className="p-4 text-gray-200 font-semibold">{offer.title}</td>
                <td className="p-4 text-gray-400">{offer.subtitle}</td>
                <td className="p-4 text-gray-300">{offer.link}</td>
                <td className="p-4 space-x-2">
                  <button onClick={() => openEditModal(offer)} className="text-blue-400 hover:underline">Edit</button>
                  <button onClick={() => deleteSpecialOffer(offer.id)} className="text-red-400 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingOffer ? 'Edit Offer' : 'Add New Offer'}>
        <OfferForm offer={editingOffer} onSave={closeModal} />
      </Modal>
    </div>
  );
};

const OfferForm: React.FC<{ offer?: SpecialOffer, onSave: () => void }> = ({ offer, onSave }) => {
    const context = useContext(AppContext);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        image: 'https://i.imgur.com/Wb2rgJH.png', // Default placeholder
        link: '/shop'
    });
    
    useEffect(() => {
        if(offer) {
            setFormData(offer);
        }
    }, [offer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(offer) {
            context?.updateSpecialOffer({...formData, id: offer.id});
        } else {
            context?.addSpecialOffer(formData);
        }
        onSave();
    };
    
    return (
         <form onSubmit={handleSubmit} className="space-y-4 text-gray-300">
            <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-base-300 border border-gray-600 p-2 rounded-md text-white" />
            </div>
             <div>
                <label className="block text-sm font-medium mb-1">Subtitle</label>
                <input name="subtitle" value={formData.subtitle} onChange={handleChange} required className="w-full bg-base-300 border border-gray-600 p-2 rounded-md text-white" />
            </div>
             <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input name="image" value={formData.image} onChange={handleChange} required className="w-full bg-base-300 border border-gray-600 p-2 rounded-md text-white" />
            </div>
             <div>
                <label className="block text-sm font-medium mb-1">Link (e.g., /product/prod-id)</label>
                <input name="link" value={formData.link} onChange={handleChange} required className="w-full bg-base-300 border border-gray-600 p-2 rounded-md text-white" />
            </div>
            <div className="flex justify-end space-x-2 pt-4 border-t border-gray-600">
                <button type="button" onClick={onSave} className="bg-base-300 hover:bg-gray-600 px-4 py-2 rounded-md">Cancel</button>
                <button type="submit" className="bg-primary hover:bg-opacity-80 px-4 py-2 rounded-md text-white">Save Offer</button>
            </div>
         </form>
    );
};

export default AdminOffersPage;
