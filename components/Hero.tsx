import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
      ></div>
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>
          ¿Antojo? Pídelo. <span className="text-red-500">¡Al instante!</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-8" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>
          Hamburguesas, pizzas y acompañamientos deliciosamente preparados, directos a tu puerta. Tu próxima comida favorita está a solo un clic.
        </p>
        <a
          href="#menu"
          className="inline-block bg-red-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Ver Menú Completo
        </a>
      </div>
    </section>
  );
};

export default Hero;