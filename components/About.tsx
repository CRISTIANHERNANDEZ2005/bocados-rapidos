// Implementing the About component which was previously missing.
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Sobre <span className="text-red-600">Bocados Rápidos</span></h2>
            <p className="mt-6 text-lg text-gray-600">
              Nacimos de una pasión simple: crear la comida rápida más deliciosa que hayas probado. Usamos solo ingredientes frescos, recetas probadas y un toque de amor en cada pedido.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Desde nuestras jugosas hamburguesas hasta nuestras pizzas artesanales, todo está hecho para satisfacer tu antojo. Creemos que la comida rápida puede ser de alta calidad y estamos aquí para demostrarlo, un bocado a la vez.
            </p>
          </div>
          <div className="mt-10 lg:mt-0">
            <img className="rounded-lg shadow-xl" src="https://images.pexels.com/photos/327158/pexels-photo-327158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Nuestra cocina" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
