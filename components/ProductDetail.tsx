import React, { useState } from 'react';
import { Product } from '../types';
import { PlusIcon, MinusIcon, ArrowLeftIcon, ShoppingCartIcon, CheckCircleIcon } from './icons';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  allProducts: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart, allProducts }) => {
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };
  
  const handleAddToCartClick = () => {
      onAddToCart(product, quantity);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
  }

  const suggestedProducts = allProducts.filter(
    p => (p.category === 'Acompañamientos' || p.category === 'Bebidas') && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={onClose} className="flex items-center space-x-2 text-gray-600 hover:text-red-600 font-semibold mb-8">
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Volver al Menú</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image Column */}
          <div>
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-auto object-cover rounded-2xl shadow-2xl"
            />
          </div>

          {/* Details Column */}
          <div className="flex flex-col">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">{product.name}</h1>
            <p className="mt-4 text-gray-600 text-lg">{product.description}</p>
            <p className="text-5xl font-bold text-red-600 my-6">${product.price.toFixed(2)}</p>

            <div className="flex items-center space-x-4 my-4">
              <p className="font-semibold text-gray-800">Cantidad:</p>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={() => handleQuantityChange(-1)} className="p-3 text-gray-600 hover:text-red-600 transition-colors" aria-label="Disminuir cantidad">
                  <MinusIcon className="w-5 h-5"/>
                </button>
                <span className="px-5 text-lg font-bold text-gray-900" aria-live="polite">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} className="p-3 text-gray-600 hover:text-red-600 transition-colors" aria-label="Aumentar cantidad">
                  <PlusIcon className="w-5 h-5"/>
                </button>
              </div>
            </div>

            <button 
                onClick={handleAddToCartClick}
                className="mt-6 w-full bg-red-600 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg
                           flex items-center justify-center space-x-3
                           hover:bg-red-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <ShoppingCartIcon />
              <span>Añadir {quantity} al Carrito</span>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${showSuccessMessage ? 'opacity-100' : 'opacity-0'}`}>
              {showSuccessMessage && (
                <div className="mt-4 flex items-center justify-center text-green-600 font-semibold">
                  <CheckCircleIcon className="w-6 h-6 mr-2" />
                  <span>¡Añadido al carrito con éxito!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Items Section */}
      {suggestedProducts.length > 0 && (
        <div className="bg-gray-100 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Acompañamientos Sugeridos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {suggestedProducts.map(p => (
                         <div key={p.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl">
                            <img className="w-full h-40 object-cover" src={p.imageUrl} alt={p.name} />
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                                <p className="text-2xl font-bold text-red-600 mt-2 mb-4">${p.price.toFixed(2)}</p>
                                <button
                                    onClick={() => onAddToCart(p, 1)}
                                    className="mt-auto w-full bg-gray-800 text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center space-x-2
                                                hover:bg-red-600 transition-colors duration-300"
                                    >
                                    <PlusIcon className="w-5 h-5" />
                                    <span>Añadir</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;