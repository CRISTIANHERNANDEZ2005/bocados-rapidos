// Implementing the main App component to resolve compilation errors and structure the application.
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import Footer from './components/Footer';
import Offers from './components/Offers';
import About from './components/About';
import Contact from './components/Contact';
import ProductDetail from './components/ProductDetail';
import Testimonials from './components/Testimonials';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | Product['category']>('Todos');
  const [dbStatus, setDbStatus] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/test')
      .then(res => res.json())
      .then(data => setDbStatus(data.now))
      .catch(err => console.error(err));

    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => {
        console.log('Products data:', data);
        setAllProducts(data);
      })
      .catch(err => {
        console.error('Error fetching products:', err)
      });
  }, []);


  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    showToast(`${product.name} fue añadido al carrito.`);
  };

  const handleRemoveItem = (productId: number) => {
    const itemToRemove = cartItems.find(item => item.id === productId);
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    if (itemToRemove) {
      showToast(`${itemToRemove.name} fue eliminado del carrito.`);
    }
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };
  
  const handleCloseDetailView = () => {
    setSelectedProduct(null);
  };
  
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setCurrentView('home');
      setSelectedProduct(null);
    }
  };

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }, [cartItems]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return allProducts.filter(product => {
      const matchesSearch = query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, allProducts]);


  const renderContent = () => {
    if (selectedProduct) {
      return <ProductDetail 
                product={selectedProduct} 
                onClose={handleCloseDetailView}
                onAddToCart={handleAddToCart}
                allProducts={allProducts}
              />;
    }

    switch(currentView) {
      case 'home':
        return (
          <>
            {!searchQuery && <Hero />}
            <ProductList 
              products={filteredProducts} 
              onViewDetails={handleViewProduct}
              onAddToCart={handleAddToCart}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <Testimonials />
          </>
        );
      case 'offers':
        return <Offers onAddToCart={handleAddToCart} />;
      case 'about':
        return <About />;
      case 'contact':

        return <Contact />;
      default:
        return <Hero />;
    }
  };


  return (
    <div className="bg-gray-50 font-sans">
      <Header 
        cartItemCount={cartItemCount} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={(view) => {
          setCurrentView(view);
          handleCloseDetailView();
        }}
        currentView={currentView}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
       />
      <main>
        <p>Database status: {dbStatus}</p>
        {renderContent()}
      </main>
      <Footer />
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        cartTotal={cartTotal}
      />
    </div>
  );
};

export default App;