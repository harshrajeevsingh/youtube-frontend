import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelectors } from './create-selectors';

const useMuteStore = create(
  devtools((set) => ({
    isMute: true,
    toggleMute: () => set((state) => ({ isMute: !state.isMute })),
  }))
);
export const useMuteSelectors = createSelectors(useMuteStore);
export default useMuteStore;
