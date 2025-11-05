export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'Hamburguesas' | 'Pizzas' | 'Acompañamientos' | 'Bebidas';
}

export interface CartItem extends Product {
  quantity: number;
}
