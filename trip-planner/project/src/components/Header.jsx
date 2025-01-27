import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { AuthModal } from './auth/AuthModal';
import { ThemeToggle } from './ThemeToggle';
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
      <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Name */}
            <div className="flex items-center gap-2">
              <Compass className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Wanderlust</span>
            </div>

            {/* Auth Buttons and Theme Toggle */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {isAuthenticated ? (
                <>
                  <span className="text-gray-600 dark:text-gray-300">Welcome, {user?.name}</span>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthClick('signin')}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
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