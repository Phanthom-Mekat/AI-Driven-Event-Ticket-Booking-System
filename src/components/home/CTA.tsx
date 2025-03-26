import { FaArrowRight } from 'react-icons/fa';

const CTA = () => {
  return (
    <section className="bg-gradient-to-r w-11/12 md:max-w-7xl mx-auto from-black to-black/10 py-16 px-8 text-white flex flex-col items-center text-center rounded-lg shadow-lg mt-12">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        Ready to take the next step?
      </h2>
      
      {/* Description */}
      <p className="text-lg md:text-xl max-w-xl mb-8">
        Join thousands of others and make the most of what we offer. Sign up today and start your journey towards success!
      </p>
      
      {/* Call to Action Button */}
      <button className="bg-primary-700 text-white py-3 px-6 rounded-full text-lg md:text-xl transition-transform transform hover:scale-105 flex items-center space-x-3">
        <span>Get Started</span>
        <FaArrowRight className="text-xl" />
      </button>
    </section>
  );
}

export default CTA;
