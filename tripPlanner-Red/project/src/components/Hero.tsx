import React, { useState } from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const quotes = [
  {
    text: "The world is a book, and those who do not travel read only one page.",
    author: "Saint Augustine"
  },
  {
    text: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller"
  },
  {
    text: "Travel far enough, you meet yourself.",
    author: "David Mitchell"
  },
  {
    text: "Adventure is worthwhile in itself.",
    author: "Amelia Earhart"
  }
];

export function Hero() {
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState(0);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const handleStartPlanning = () => {
    navigate('/plan-trip');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-8 cursor-pointer"
            onClick={nextQuote}
          >
            <Quote className="w-8 h-8 text-white mb-4 mx-auto" />
            <p className="text-white text-2xl sm:text-3xl md:text-4xl font-light mb-4 italic">
              "{quotes[currentQuote].text}"
            </p>
            <p className="text-white/80 text-lg">
              — {quotes[currentQuote].author}
            </p>
          </div>

          <button 
            onClick={handleStartPlanning}
            className="bg-white text-gray-900 px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            Start Planning Your Trip
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}