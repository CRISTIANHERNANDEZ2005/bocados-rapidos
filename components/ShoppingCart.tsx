import React, { Fragment } from 'react';
import { CartItem } from '../types';
import { CloseIcon, PlusIcon, MinusIcon, TrashIcon } from './icons';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  cartTotal: string;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  cartTotal,
}) => {
  return (
    <Fragment>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 id="cart-heading" className="text-2xl font-bold text-gray-900">Tu Carrito</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
              aria-label="Cerrar carrito"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <p className="text-xl font-semibold">Tu carrito está vacío</p>
                <p className="mt-2">Parece que aún no has añadido nada.</p>
              </div>
            ) : (
              <ul className="-my-6 divide-y divide-gray-200">
                {cartItems.map(item => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} c/u</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-gray-200 rounded">
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1.5 text-gray-500 hover:text-red-600" aria-label="Disminuir cantidad"><MinusIcon/></button>
                          <span className="px-3 text-gray-900" aria-live="polite">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1.5 text-gray-500 hover:text-red-600" aria-label="Aumentar cantidad"><PlusIcon/></button>
                        </div>
                        <div className="flex">
                          <button onClick={() => onRemoveItem(item.id)} type="button" className="font-medium text-red-600 hover:text-red-800" aria-label={`Quitar ${item.name}`}>
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 py-6 px-6">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <p>Subtotal</p>
                <p>${cartTotal}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">Envío e impuestos calculados al finalizar.</p>
              <div className="mt-6">
                <button className="w-full bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-700">
                  Finalizar Compra
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ShoppingCart;