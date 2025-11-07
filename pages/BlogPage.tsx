
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_BLOG_POSTS } from '../constants';

const BlogPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-base-200 p-8 rounded-2xl shadow-3d text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Our Blog</h1>
        <p className="text-gray-300 mt-2">News, tips, and updates on the latest digital tools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_BLOG_POSTS.map(post => (
          <div key={post.id} className="bg-base-200 rounded-xl overflow-hidden shadow-3d hover:shadow-3d-hover transition-all duration-300 transform hover:-translate-y-2">
            <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
            <div className="p-6">
              <p className="text-sm text-gray-400 mb-2">{post.date} by {post.author}</p>
              <h2 className="text-2xl font-bold text-white mb-3">{post.title}</h2>
              <p className="text-gray-300 mb-4">{post.excerpt}</p>
              <Link to="#" className="font-semibold text-primary hover:text-opacity-80">
                Read More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
