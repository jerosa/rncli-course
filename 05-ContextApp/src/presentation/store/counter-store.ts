import { create } from "zustand";

export interface CounterState {
  count: number

  incrementBy: (value: number) => void;
}

// export type Actions = {}

export const useCounterStore = create<CounterState>()((set) => ({
  count: 0,

  incrementBy: (value: number) => {

    set((state) => ({ count: state.count + value }))
  },
}));
