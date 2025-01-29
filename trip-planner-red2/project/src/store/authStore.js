import { create } from 'zustand';

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} user
 * @property {boolean} isAuthenticated
 * @property {function(string, string): Promise<void>} signIn
 * @property {function(string, string, string): Promise<void>} signUp
 * @property {function(): void} signOut
 */

/** @type {import('zustand').StateCreator<AuthState>} */
const createAuthStore = (set) => ({
  user: null,
  isAuthenticated: false,
  signIn: async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({
      user: { id: '1', email, name: email.split('@')[0] },
      isAuthenticated: true
    });
  },
  signUp: async (email, password, name) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({
      user: { id: '1', email, name },
      isAuthenticated: true
    });
  },
  signOut: () => {
    set({ user: null, isAuthenticated: false });
  }
});

export const useAuthStore = create(createAuthStore);