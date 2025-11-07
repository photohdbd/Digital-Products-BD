import React, { useState, useContext, useEffect } from 'react';
import { Product } from '../types';
import { AppContext } from '../context/AppContext';
import { MOCK_CATEGORIES } from '../constants';

interface AdminProductFormProps {
  product?: Product;
  onSave: () => void;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({ product, onSave }) => {
  const context = useContext(AppContext);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    images: ['https://i.imgur.com/Wb2rgJH.png'], // Default placeholder
    price: 0,
    discountPrice: undefined,
    discountUntil: undefined,
    tags: [],
    category: MOCK_CATEGORIES[0],
    isLive: false,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        discountPrice: product.discountPrice || undefined,
        discountUntil: product.discountUntil ? new Date(product.discountUntil).toISOString().substring(0, 16) : undefined,
      });
      setImagePreview(product.images[0]);
    } else {
        setImagePreview('https://i.imgur.com/Wb2rgJH.png');
    }
  }, [product]);

  // FIX: The `handleChange` function was causing a TypeScript error because it was trying
  // to access the `checked` property on a union type where it doesn't always exist.
  // This has been fixed by using an `instanceof` type guard to ensure `checked` is
  // only accessed on an HTMLInputElement of type 'checkbox'.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setFormData(prev => ({ ...prev, [target.name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [target.name]: target.value }));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()) }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
              const newImageUrl = reader.result as string;
              setImagePreview(newImageUrl);
              setFormData(prev => ({...prev, images: [newImageUrl]}));
          }
          reader.readAsDataURL(file);
      }
  };
  
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setFormData(prev => ({...prev, images: [newUrl]}));
    if (newUrl) {
      setImagePreview(newUrl);
    } else {
      setImagePreview('https://i.imgur.com/Wb2rgJH.png'); // Reset to placeholder if URL is cleared
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
        ...formData,
        price: parseFloat(String(formData.price)),
        discountPrice: formData.discountPrice ? parseFloat(String(formData.discountPrice)) : undefined,
        discountUntil: formData.discountUntil ? new Date(formData.discountUntil).toISOString() : undefined,
    };
    if (product) {
      context?.updateProduct({ ...finalData, id: product.id });
    } else {
      context?.addProduct(finalData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 text-gray-300">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium mb-1">Product Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} required className="w-full bg-base-300 border border-gray-600 p-2 rounded-md text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows={5} className="w-full bg-base-300 border border-gray-600 p-2 rounded-md text-white" />
                </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Price (BDT)</label>
                    <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required className="w-full bg-base-300 border border-gray-600 p-2 rounded-md text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Discount Price (Optional)</label>
                    <input name="discountPrice" type="number" step="0.01" value={formData.discountPrice || ''} onChange={handleChange} className="w-full bg-base-300 border border-gray-600 p-2 rounded-md text-white" />
                </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Discount End Time</label>
                    <input name="discountUntil" type="datetime-local" value={formData.discountUntil || ''} onChange={handleChange} className="w-full bg-base-300 border border-gray-600 p-2 rounded-md text-white" />
                </div>
            </div>
            <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium mb-1">Product Image Preview</label>
                    <div className="mt-1 flex flex-col items-center p-2 border-2 border-dashed border-gray-600 rounded-md">
                        {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-48 object-contain rounded-md mb-2 bg-white/10" />}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input type="url" placeholder="https://example.com/image.png" value={formData.images[0]} onChange={handleImageUrlChange} className="w-full bg-base-300 border border-gray-600 p-2 rounded-md text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Or Upload Image</label>
                    <input type="file" onChange={handleImageChange} accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input list="categories" name="category" value={formData.category} onChange={handleChange} className="w-full bg-base-300 border border-gray-600 p-2 rounded-md text-white" />
                    <datalist id="categories">
                         {MOCK_CATEGORIES.map(cat => <option key={cat} value={cat} />)}
                    </datalist>
                </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                    <input value={formData.tags.join(', ')} onChange={handleTagsChange} className="w-full bg-base-300 border border-gray-600 p-2 rounded-md text-white" />
                </div>
                 <label className="flex items-center space-x-3 text-gray-200 pt-4">
                    <input name="isLive" type="checkbox" checked={formData.isLive} onChange={handleChange} className="h-5 w-5 rounded bg-base-300 border-gray-600 text-primary focus:ring-primary" />
                    <span>Make Product Live</span>
                </label>
            </div>
       </div>

      <div className="flex justify-end space-x-2 pt-4 border-t border-gray-600">
        <button type="button" onClick={onSave} className="bg-base-300 hover:bg-gray-600 px-4 py-2 rounded-md text-white">Cancel</button>
        <button type="submit" className="bg-primary hover:bg-opacity-80 px-4 py-2 rounded-md text-white">Save Product</button>
      </div>
    </form>
  );
};

export default AdminProductForm;