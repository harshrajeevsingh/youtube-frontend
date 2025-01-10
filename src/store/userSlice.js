import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createSelectors } from './create-selectors';

const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        accessToken: null,
        refreshToken: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: 'user-store',
      }
    )
  )
);

export const useUserStoreSelectors = createSelectors(useUserStore);
export default useUserStore;
