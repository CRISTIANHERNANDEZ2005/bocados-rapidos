import React from 'react';
import { Product } from '../types';
import { ShoppingCartIcon } from './icons';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, onAddToCart }) => {
  
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se dispare el onClick del div padre
    onAddToCart(product);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
    >
      <div onClick={() => onViewDetails(product)} className="cursor-pointer">
        <div className="relative">
          <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
          <div className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">${product.price.toFixed(2)}</div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
          <p className="text-gray-600 text-sm h-10 line-clamp-2">{product.description}</p>
        </div>
      </div>
      <div className="mt-auto p-6 pt-0">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onViewDetails(product)}
              className="flex-1 text-center text-red-600 font-semibold py-2 px-4 rounded-lg border-2 border-red-600 
                        transition-colors duration-300 hover:bg-red-600 hover:text-white"
            >
              Ver Detalles
            </button>
            <button
              onClick={handleAddToCartClick}
              aria-label={`Añadir ${product.name} al carrito`}
              className="p-3 bg-gray-800 text-white rounded-lg
                         transition-colors duration-300 hover:bg-red-600"
            >
              <ShoppingCartIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
    </div>
  );
};

export default ProductCard;