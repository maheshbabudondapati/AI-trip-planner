import React, { useState } from 'react';
import { Compass, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  const handleSocialClick = (platform) => {
    // Replace with actual social media URLs
    const urls = {
      instagram: 'https://instagram.com/wanderlust',
      facebook: 'https://facebook.com/wanderlust',
      twitter: 'https://twitter.com/wanderlust'
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-6 h-6 text-primary-500" />
              <span className="text-xl font-bold text-white">Wanderlust</span>
            </div>
            <p className="text-sm mb-4 text-gray-400">
              Empowering travelers to explore the world with confidence through 
              smart planning tools and inspiring content.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => handleSocialClick('instagram')}
                className="text-gray-400 hover:text-primary-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('facebook')}
                className="text-gray-400 hover:text-primary-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('twitter')}
                className="text-gray-400 hover:text-primary-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-primary-500 transition-colors">Home</a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-primary-500 transition-colors">About Us</a>
              </li>
              <li>
                <a href="/features" className="text-gray-400 hover:text-primary-500 transition-colors">Features</a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-primary-500 transition-colors">Travel Blog</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-primary-500 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/guides" className="text-gray-400 hover:text-primary-500 transition-colors">Travel Guides</a>
              </li>
              <li>
                <a href="/tips" className="text-gray-400 hover:text-primary-500 transition-colors">Trip Planning Tips</a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-primary-500 transition-colors">FAQs</a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-primary-500 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-primary-500 transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Connected</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary-500" />
                <a href="mailto:contact@wanderlust.com" className="text-gray-400">contact@wanderlust.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary-500" />
                <a href="tel:+15551234567" className="text-gray-400">+1 (555) 123-4567</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span className="text-gray-400">123 Travel Street, Adventure City</span>
              </div>
              <form onSubmit={handleSubscribe} className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Subscribe to our newsletter
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {subscribed ? 'Subscribed!' : 'Subscribe'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Wanderlust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}