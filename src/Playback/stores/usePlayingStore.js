import { create } from "zustand";

export const usePlayingStore = create((set) => ({
  isPlaying: false,

  setIsPlaying: (updater) =>
    typeof updater === "function"
      ? set((state) => ({ isPlaying: updater(state.isPlaying) }))
      : set({ isPlaying: updater }),
}));
