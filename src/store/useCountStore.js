import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createSelectors } from "./create-selectors";

const useCountStore = create(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
      }),
      {
        name: "count-storage",
      }
    ),
    { name: "CountStore" }
  )
);
export const useCountSelectors = createSelectors(useCountStore);
export default useCountStore;
