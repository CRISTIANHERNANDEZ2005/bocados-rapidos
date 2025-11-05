
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const products = [
    { id: 1, name: 'Clásica con Queso', description: 'Carne de res jugosa de 150g, queso cheddar fundido, lechuga fresca, rodajas de tomate, cebolla morada y nuestra salsa secreta en un pan brioche tostado.', price: 8.99, imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Hamburguesas' },
    { id: 2, name: 'Pizza Margarita', description: 'La clásica pizza italiana con una base de tomate San Marzano, mozzarella fresca, hojas de albahaca, un chorrito de aceite de oliva y una masa fina y crujiente.', price: 12.50, imageUrl: 'https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Pizzas' },
    { id: 3, name: 'Papas Fritas', description: 'Papas cortadas a mano, doblemente fritas para una textura extra crujiente por fuera y suave por dentro. Servidas con tu elección de salsa.', price: 3.49, imageUrl: 'https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Acompañamientos' },
    { id: 4, name: 'Refresco de Cola', description: '355ml de refresco de cola helado, la bebida perfecta para acompañar cualquier comida.', price: 1.99, imageUrl: 'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Bebidas' },
    { id: 5, name: 'Hamburguesa BBQ Picante', description: '150g de carne de res, salsa BBQ ahumada, jalapeños en rodajas, aros de cebolla crujientes y queso pepper jack en pan de sésamo.', price: 10.99, imageUrl: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Hamburguesas' },
    { id: 6, name: 'Pizza de Pepperoni', description: 'Un clásico atemporal con generosas capas de pepperoni picante y mozzarella derretida sobre nuestra exclusiva salsa de tomate.', price: 14.00, imageUrl: 'https://images.pexels.com/photos/8251159/pexels-photo-8251159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Pizzas' },
    { id: 7, name: 'Aros de Cebolla', description: 'Aros de cebolla gruesos, rebozados en cerveza y fritos a la perfección hasta que estén dorados y crujientes. Servidos con salsa ranch.', price: 4.99, imageUrl: 'https://images.pexels.com/photos/6748995/pexels-photo-6748995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Acompañamientos' },
    { id: 8, name: 'Deluxe con Tocino', description: 'Una hamburguesa premium con 180g de carne, tocino ahumado crujiente, queso suizo, champiñones salteados y mayonesa de ajo.', price: 11.50, imageUrl: 'https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', category: 'Hamburguesas' },
];

async function seed() {
  const client = await pool.connect();
  try {
    for (const product of products) {
      await client.query(
        'INSERT INTO products (id, name, description, price, "imageUrl", category) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING',
        [product.id, product.name, product.description, product.price, product.imageUrl, product.category]
      );
    }
  } finally {
    client.release();
    pool.end();
  }
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
