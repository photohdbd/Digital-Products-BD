import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartIcon from './CartIcon';
import { AppContext } from '../context/AppContext';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const context = useContext(AppContext);

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `text-lg font-medium transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-300 hover:text-primary'}`;

    const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `block py-2 px-4 text-lg ${isActive ? 'bg-primary text-white' : 'text-gray-300'}`;

    let navLinks = [
        { path: '/', name: 'Home' },
        { path: '/shop', name: 'Shop' },
        { path: '/about', name: 'About' },
        { path: '/contact', name: 'Contact' },
    ];

    return (
        <header className="bg-base-200/80 backdrop-blur-sm sticky top-0 z-50 shadow-subtle">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-4xl font-bold text-white tracking-wider">
                    Olala<span className="text-primary">DOT</span>
                </Link>

                <nav className="hidden lg:flex space-x-8 items-center">
                    {navLinks.map(link => (
                        <NavLink key={link.path} to={link.path} className={navLinkClasses}>
                            {link.name}
                        </NavLink>
                    ))}
                    {context?.isAuthenticated ? (
                         <NavLink to="/account" className={navLinkClasses}>My Account</NavLink>
                    ) : (
                         <NavLink to="/login" className={navLinkClasses}>Login</NavLink>
                    )}
                </nav>

                <div className="flex items-center space-x-4">
                    <CartIcon />
                    <button className="lg:hidden text-gray-300 hover:text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden bg-base-200 shadow-lg">
                    <nav className="flex flex-col p-4">
                        {navLinks.map(link => (
                            <NavLink key={link.path} to={link.path} className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>
                                {link.name}
                            </NavLink>
                        ))}
                         {context?.isAuthenticated ? (
                            <NavLink to="/account" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>My Account</NavLink>
                        ) : (
                            <NavLink to="/login" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Login</NavLink>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;