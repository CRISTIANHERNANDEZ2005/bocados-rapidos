import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import CategoryFilter from './CategoryFilter';

const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col animate-pulse">
      <div className="relative">
        <div className="w-full h-48 bg-gray-300"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
        <div className="mt-auto pt-4">
          <div className="w-full bg-gray-300 h-10 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

interface ProductListProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  selectedCategory: 'Todos' | Product['category'];
  onSelectCategory: (category: 'Todos' | Product['category']) => void;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  onViewDetails, 
  onAddToCart,
  selectedCategory,
  onSelectCategory
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);


  const categories: ('Todos' | Product['category'])[] = ['Todos', 'Hamburguesas', 'Pizzas', 'Acompañamientos', 'Bebidas'];

  return (
    <section id="menu" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Nuestro Menú</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Hechos a mano con los mejores ingredientes. Sumérgete y descubre tu nuevo favorito.
          </p>
        </div>
        
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={onSelectCategory} 
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)
          ) : products.length > 0 ? (
            products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={onViewDetails}
                onAddToCart={onAddToCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700">No se encontraron productos</h3>
              <p className="text-gray-500 mt-2">Prueba con otra búsqueda o categoría.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;