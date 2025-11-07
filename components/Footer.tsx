
import React from 'react';
import { Link } from 'react-router-dom';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors duration-300">
        {children}
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-base-300 text-gray-300 mt-16">
            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Digital Products BD</h2>
                        <p className="mt-2 text-sm text-gray-400">Your trusted source for digital goods.</p>
                        <div className="flex mt-4 space-x-4">
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.795 2.013 10.148 2 12.315 2zm-1.161 4.573a.75.75 0 01.75.75v3.182a.75.75 0 01-1.5 0V7.323a.75.75 0 01.75-.75zm0 10.5a.75.75 0 01.75.75v3.182a.75.75 0 01-1.5 0v-3.182a.75.75 0 01.75-.75zM12 15a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                            </SocialIcon>
                             <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.46 3.48 1.32 4.95L2 22l5.25-1.38c1.41.79 3.02 1.21 4.7 1.21h.01c5.46 0 9.9-4.45 9.9-9.91s-4.44-9.9-9.9-9.9zM17.13 15.2c-.23-.11-1.36-.67-1.57-.75-.21-.08-.36-.11-.52.11-.16.23-.59.75-.73.9-.13.16-.27.18-.5.06-.23-.11-1-.37-1.89-1.17-.7-.64-1.17-1.45-1.31-1.7-.14-.26 0-.4.1-.52.1-.11.23-.29.35-.43.11-.14.16-.23.23-.39.08-.16.04-.3-.02-.41-.06-.11-.52-1.25-.71-1.71-.19-.46-.38-.4-.52-.4-.14 0-.3 0-.46 0-.16 0-.41.06-.62.3.22.24-.84 1.21-.84 2.94 0 1.72.86 3.41 1 3.65.14.23 1.71 2.62 4.14 3.63.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.06 1.36-.55 1.55-1.08.19-.53.19-1 .13-1.08s-.22-.16-.46-.29z"></path></svg>
                            </SocialIcon>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                             <li><Link to="/shop" className="text-gray-400 hover:text-white">Shop</Link></li>
                            <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Policies</h3>
                        <ul className="mt-4 space-y-2">
                             <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                            <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
                            <li><Link to="/refund-policy" className="text-gray-400 hover:text-white">Refund Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Newsletter</h3>
                        <p className="text-gray-400 mt-2 text-sm">Get the latest updates and offers.</p>
                        <form className="mt-4">
                            <input type="email" placeholder="Your Email" className="w-full bg-base-200 border border-base-100 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                            <button type="submit" className="w-full mt-2 bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105">Subscribe</button>
                        </form>
                    </div>
                </div>
                <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Digital Products BD. All rights reserved.</p>
                    <Link to="/admin" className="text-xs text-gray-700 hover:text-gray-500 mt-2 inline-block">Admin Login</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
