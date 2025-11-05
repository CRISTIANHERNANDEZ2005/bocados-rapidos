// Implementing the Offers component which was previously missing.
import React from 'react';
import { Product } from '../types';

interface OffersProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const comboClasico: Product = {
  id: 101,
  name: "Combo Clásico",
  description: "Hamburguesa Clásica con Queso + Papas Fritas + Refresco.",
  price: 12.99,
  category: 'Hamburguesas',
  imageUrl: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=400'
};

const duoPizzas: Product = {
  id: 102,
  name: "Dúo de Pizzas",
  description: "Elige dos de tus pizzas favoritas y ahorra.",
  price: 22.00,
  category: 'Pizzas',
  imageUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400'
};


const Offers: React.FC<OffersProps> = ({ onAddToCart }) => {
  return (
    <section id="offers" className="bg-red-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Ofertas Especiales</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            ¡No te pierdas nuestros combos y descuentos exclusivos!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row items-center p-6">
            <img src={comboClasico.imageUrl} alt="Combo Clásico" className="w-32 h-32 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6" />
            <div className="flex-grow text-center sm:text-left">
              <h3 className="text-xl font-bold text-gray-800">Combo Clásico</h3>
              <p className="text-gray-600 mt-2">{comboClasico.description}</p>
              <div className="flex items-center justify-center sm:justify-start mt-4">
                <p className="text-2xl font-extrabold text-red-600 mr-4">${comboClasico.price.toFixed(2)}</p>
                <span className="text-base font-normal text-gray-500 line-through">$14.47</span>
              </div>
               <button onClick={() => onAddToCart(comboClasico, 1)} className="mt-4 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">Añadir al Carrito</button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row items-center p-6">
            <img src={duoPizzas.imageUrl} alt="Dúo de Pizzas" className="w-32 h-32 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6" />
            <div className="flex-grow text-center sm:text-left">
              <h3 className="text-xl font-bold text-gray-800">Dúo de Pizzas</h3>
              <p className="text-gray-600 mt-2">{duoPizzas.description}</p>
              <p className="text-2xl font-extrabold text-red-600 mt-3">Desde ${duoPizzas.price.toFixed(2)}</p>
              <button onClick={() => onAddToCart(duoPizzas, 1)} className="mt-4 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">Añadir al Carrito</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offers;
