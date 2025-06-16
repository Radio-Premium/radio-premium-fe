import { create } from "zustand";

export const useVideoElementStore = create((set) => ({
  videoElement: null,

  setVideoElement: (videoElement) => set({ videoElement }),
}));
