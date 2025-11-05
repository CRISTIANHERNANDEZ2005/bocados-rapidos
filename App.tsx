// Implementing the main App component to resolve compilation errors and structure the application.
import React, { useState, useMemo } from 'react';
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

  const allProducts: Product[] = [
    { id: 1, name: 'Clásica con Queso', description: 'Carne de res jugosa de 150g, queso cheddar fundido, lechuga fresca, rodajas de tomate, cebolla morada y nuestra salsa secreta en un pan brioche tostado.', price: 8.99, imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Hamburguesas' },
    { id: 2, name: 'Pizza Margarita', description: 'La clásica pizza italiana con una base de tomate San Marzano, mozzarella fresca, hojas de albahaca, un chorrito de aceite de oliva y una masa fina y crujiente.', price: 12.50, imageUrl: 'https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Pizzas' },
    { id: 3, name: 'Papas Fritas', description: 'Papas cortadas a mano, doblemente fritas para una textura extra crujiente por fuera y suave por dentro. Servidas con tu elección de salsa.', price: 3.49, imageUrl: 'https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Acompañamientos' },
    { id: 4, name: 'Refresco de Cola', description: '355ml de refresco de cola helado, la bebida perfecta para acompañar cualquier comida.', price: 1.99, imageUrl: 'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Bebidas' },
    { id: 5, name: 'Hamburguesa BBQ Picante', description: '150g de carne de res, salsa BBQ ahumada, jalapeños en rodajas, aros de cebolla crujientes y queso pepper jack en pan de sésamo.', price: 10.99, imageUrl: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Hamburguesas' },
    { id: 6, name: 'Pizza de Pepperoni', description: 'Un clásico atemporal con generosas capas de pepperoni picante y mozzarella derretida sobre nuestra exclusiva salsa de tomate.', price: 14.00, imageUrl: 'https://images.pexels.com/photos/8251159/pexels-photo-8251159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Pizzas' },
    { id: 7, name: 'Aros de Cebolla', description: 'Aros de cebolla gruesos, rebozados en cerveza y fritos a la perfección hasta que estén dorados y crujientes. Servidos con salsa ranch.', price: 4.99, imageUrl: 'https://images.pexels.com/photos/6748995/pexels-photo-6748995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Acompañamientos' },
    { id: 8, name: 'Deluxe con Tocino', description: 'Una hamburguesa premium con 180g de carne, tocino ahumado crujiente, queso suizo, champiñones salteados y mayonesa de ajo.', price: 11.50, imageUrl: 'https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Hamburguesas' },
  ];
  
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