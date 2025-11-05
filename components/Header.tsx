// Implementing the Header component which was previously missing.
import React from 'react';
import { ShoppingCartIcon, SearchIcon } from './icons';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onNavigate: (view: 'home' | 'offers' | 'about' | 'contact') => void;
  currentView: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartItemCount, 
  onCartClick, 
  onNavigate, 
  currentView, 
  searchQuery,
  onSearchChange
}) => {
  const navLinkClasses = (view: string) => 
    `text-gray-600 hover:text-red-600 font-medium transition-colors cursor-pointer ${
      currentView === view && !searchQuery ? 'text-red-600' : ''
    }`;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a onClick={() => onNavigate('home')} className="text-2xl font-bold text-gray-900 cursor-pointer">
              <span className="text-red-600">Bocados</span>Rápidos
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a onClick={() => onNavigate('home')} className={navLinkClasses('home')}>Menú</a>
            <a onClick={() => onNavigate('offers')} className={navLinkClasses('offers')}>Ofertas</a>
            <a onClick={() => onNavigate('about')} className={navLinkClasses('about')}>Nosotros</a>
            <a onClick={() => onNavigate('contact')} className={navLinkClasses('contact')}>Contacto</a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
            </div>
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              aria-label="Ver carrito"
            >
              <ShoppingCartIcon />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;