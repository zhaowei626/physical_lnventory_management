import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  username: string;
  role: string;
}

interface AppState {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo | null) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (info) => set({ userInfo: info }),
      logout: () => set({ userInfo: null }),
    }),
    {
      name: 'app-storage',
    }
  )
);
