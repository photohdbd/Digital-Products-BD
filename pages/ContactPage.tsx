import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const ContactPage: React.FC = () => {
  const context = useContext(AppContext);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({...formData, [e.target.id]: e.target.value});
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    context?.submitContactForm(formData.name, formData.email, formData.message);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Contact Us</h1>
        <p className="mt-4 text-xl text-gray-300">We'd love to hear from you!</p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="bg-base-200 p-8 rounded-2xl shadow-lifted border border-base-300">
          <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
          {submitted ? (
              <div className="text-center bg-base-100 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-primary">Thank You!</h3>
                <p className="text-gray-300 mt-2">Your message has been sent. We will get back to you shortly.</p>
              </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-base-300 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} required className="w-full bg-base-300 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea id="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full bg-base-300 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
                Send Message
              </button>
            </form>
          )}
        </div>
        <div className="space-y-8">
            <div className="bg-base-200 p-8 rounded-2xl shadow-lifted border border-base-300">
                <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
                <div className="space-y-4 text-gray-300">
                    <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Dhaka, Bangladesh</p>
                    <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> support@digibd.com</p>
                    <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> +880 1234 567890</p>
                </div>
            </div>
             <div className="bg-base-200 p-8 rounded-2xl shadow-lifted border border-base-300">
                <h3 className="text-2xl font-bold text-white mb-4">Business Hours</h3>
                 <div className="space-y-2 text-gray-300">
                     <p>Saturday - Thursday: 10:00 AM - 8:00 PM</p>
                     <p>Friday: Closed</p>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;