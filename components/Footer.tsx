import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold"><span className="text-red-500">Bocados</span>Rápidos</h3>
            <p className="text-gray-400 mt-2">© {new Date().getFullYear()} Bocados Rápidos. Todos los derechos reservados.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Twitter">
              <TwitterIcon />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;