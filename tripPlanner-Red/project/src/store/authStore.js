import { create } from 'zustand';

export const useAuthStore = create((set) => ({
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
}));