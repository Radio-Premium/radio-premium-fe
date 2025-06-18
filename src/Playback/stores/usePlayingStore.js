import { create } from "zustand";

export const usePlayingStore = create((set) => ({
  isPlaying: false,

  setIsPlaying: (isPlaying) =>
    typeof isPlaying === "function"
      ? set((state) => ({ isPlaying: isPlaying(state.isPlaying) }))
      : set({ isPlaying }),
}));
