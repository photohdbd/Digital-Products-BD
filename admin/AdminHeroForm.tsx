import React, { useState, useContext, useEffect } from 'react';
import { HeroSlide } from '../types';
import { AppContext } from '../context/AppContext';

interface AdminHeroFormProps {
  slide?: HeroSlide;
  onSave: () => void;
}

const AdminHeroForm: React.FC<AdminHeroFormProps> = ({ slide, onSave }) => {
  const context = useContext(AppContext);
  const [formData, setFormData] = useState<Omit<HeroSlide, 'id'>>({
    title: '',
    subtitle: '',
    image: '',
    buttonText: '',
    buttonLink: '',
  });

  useEffect(() => {
    if (slide) {
      setFormData({
        title: slide.title,
        subtitle: slide.subtitle,
        image: slide.image,
        buttonText: slide.buttonText,
        buttonLink: slide.buttonLink,
      });
    } else {
        setFormData({
            title: '',
            subtitle: '',
            image: '',
            buttonText: '',
            buttonLink: '',
        });
    }
  }, [slide]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (slide) {
      context?.updateHeroSlide({ ...formData, id: slide.id });
    } else {
      context?.addHeroSlide(formData);
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
        <input name="image" type="url" placeholder="https://example.com/image.png" value={formData.image} onChange={handleChange} required className="w-full bg-base-300 border border-gray-600 p-2 rounded-md text-white" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Button Text</label>
        <input name="buttonText" value={formData.buttonText} onChange={handleChange} required className="w-full bg-base-300 border border-gray-600 p-2 rounded-md text-white" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Button Link (e.g., /shop or /product/prod-id)</label>
        <input name="buttonLink" value={formData.buttonLink} onChange={handleChange} required className="w-full bg-base-300 border border-gray-600 p-2 rounded-md text-white" />
      </div>
      <div className="flex justify-end space-x-2 pt-4 border-t border-gray-600">
        <button type="button" onClick={onSave} className="bg-base-300 hover:bg-gray-600 px-4 py-2 rounded-md text-white">Cancel</button>
        <button type="submit" className="bg-primary hover:bg-opacity-80 px-4 py-2 rounded-md text-white">Save Slide</button>
      </div>
    </form>
  );
};

export default AdminHeroForm;
