import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(persist(
  (set) => ({
    isLoggedIn: false,
    token: "",
    checkAuth: async() => {
      const token = localStorage.getItem(import.meta.env.VITE_JWT);
      if (token) {
        const endpoint = `${import.meta.env.VITE_API_URL}/auth/check-status`;
        const params = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        };
        const res = await fetch(endpoint, params);
        const json = await res.json();
        if (json) {
          const {statusCode} = json;
          if (statusCode === 400 || statusCode === 401) {
            localStorage.removeItem(import.meta.env.VITE_JWT);
            set({ isLoggedIn: false, token: "" });
          } else {
            localStorage.setItem(import.meta.env.VITE_JWT, token);
            set({ isLoggedIn: true, token });
          }
        }
      } else {
        set({ isLoggedIn: false, token: "" });
      }
    },
    login: (token) => {
      localStorage.setItem(import.meta.env.VITE_JWT, token);
      set({ isLoggedIn: true, token });
    },
    logout: () => {
      localStorage.removeItem(import.meta.env.VITE_JWT);
      set({ isLoggedIn: false, token: ""});
    },
  }),
  {
    name: 'auth-storage',
    getStorage: () => localStorage,
  }
));

export default useAuthStore;
