import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ThumbsUp } from 'lucide-react';
import { AuthModal } from './auth/AuthModal';
import { useAuthStore } from '../store/authStore';

export function Header() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const { isAuthenticated, user, signOut } = useAuthStore();

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <Compass className="w-8 h-8 text-primary-600" />
                <span className="text-xl font-bold text-gray-900">Wanderlust</span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/guides" className="text-gray-600 hover:text-gray-900">Guides</Link>
                <Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
                <Link to="/hitchhike" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                  <ThumbsUp className="w-4 h-4" />
                  Hitch-hike
                </Link>
              </nav>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-600">Welcome, {user?.name}</span>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthClick('signin')}
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}