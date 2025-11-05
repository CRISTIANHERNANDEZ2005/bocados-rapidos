import React from 'react';
import { Product } from '../types';

type Category = 'Todos' | Product['category'];

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-12">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
            ${selectedCategory === category
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;