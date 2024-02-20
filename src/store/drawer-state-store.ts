import { create } from 'zustand';

interface DrawerStateStore {
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useDrawerStateStore = create<DrawerStateStore>((set) => ({
    drawerOpen: false,
    openDrawer: () => set({ drawerOpen: true }),
    closeDrawer: () => set({ drawerOpen: false }),
}));