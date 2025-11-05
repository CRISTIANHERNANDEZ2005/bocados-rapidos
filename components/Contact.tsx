// Implementing the Contact component which was previously missing.
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Ponte en Contacto</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            ¿Preguntas, comentarios o simplemente quieres saludar? ¡Nos encantaría saber de ti!
          </p>
        </div>
        <div className="max-w-lg mx-auto">
          <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="full-name" className="sr-only">Nombre completo</label>
              <input type="text" name="full-name" id="full-name" autoComplete="name" className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-red-500 focus:border-red-500 border-gray-300 rounded-md" placeholder="Nombre completo" />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Correo electrónico</label>
              <input id="email" name="email" type="email" autoComplete="email" className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-red-500 focus:border-red-500 border-gray-300 rounded-md" placeholder="Correo electrónico" />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Mensaje</label>
              <textarea id="message" name="message" rows={4} className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-red-500 focus:border-red-500 border border-gray-300 rounded-md" placeholder="Mensaje"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
