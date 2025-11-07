import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { MOCK_CATEGORIES } from '../constants';

const ShopPage: React.FC = () => {
  const context = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  if (!context) return <div>Loading...</div>;
  const { products } = context;

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(p => p.isLive);

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // 'featured'
        break;
    }

    return filtered;
  }, [products, selectedCategory, searchTerm, sortBy]);

  const categories = ['All', ...MOCK_CATEGORIES];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-base-200 p-8 rounded-lg shadow-subtle text-center mb-12 border border-base-300">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Our Products</h1>
        <p className="text-gray-500 mt-2">Find the perfect digital asset for your next project.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <aside className="lg:col-span-1 bg-base-100 p-6 rounded-lg shadow-subtle h-fit border border-base-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Filters</h2>
          <div className="mb-6">
            <label htmlFor="search" className="block text-gray-800 mb-2 font-semibold">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-base-200 border border-base-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${selectedCategory === cat ? 'bg-primary text-white' : 'hover:bg-base-200 text-gray-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="sort" className="block text-gray-800 mb-2 font-semibold">Sort By</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-base-200 border border-base-300 rounded-md py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-3">
            {filteredAndSortedProducts.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAndSortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center bg-base-200 p-12 rounded-xl shadow-lg">
                    <h2 className="text-2xl text-gray-700">No products found.</h2>
                    <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
