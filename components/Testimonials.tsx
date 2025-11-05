import React from 'react';
import { StarIcon } from './icons';

const testimonials = [
  {
    name: 'Carlos Rodríguez',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    comment: '¡La mejor hamburguesa que he probado en mucho tiempo! La carne estaba súper jugosa y los ingredientes frescos. El servicio fue rápido y amable. ¡Volveré sin duda!',
  },
  {
    name: 'Ana García',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
    comment: 'Pedimos la pizza de pepperoni y estaba espectacular. La masa crujiente y la cantidad de queso perfecta. Se ha convertido en nuestro sitio de pizzas favorito para las noches de peli.',
  },
  {
    name: 'Javier Martinez',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4,
    comment: 'Excelente relación calidad-precio. El Combo Clásico es súper completo y te deja más que satisfecho. Ideal para un almuerzo rápido y delicioso. ¡Muy recomendado!',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Lo que dicen nuestros clientes</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Nos enorgullece servir comida que la gente ama.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
              <img src={testimonial.avatar} alt={testimonial.name} className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-red-100" />
              <div className="flex text-yellow-400 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className={`w-6 h-6 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">"{testimonial.comment}"</p>
              <p className="font-bold text-gray-800 text-lg">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;