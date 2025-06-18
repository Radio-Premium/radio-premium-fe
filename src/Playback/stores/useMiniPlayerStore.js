import { create } from "zustand";

export const useMiniPlayerStore = create((set) => ({
  isVisible: false,
  playingChannelId: null,

  setPlayingChannelId: (playingChannelId) => set({ playingChannelId }),
  openMiniPlayer: (playingChannelId) =>
    set({ isVisible: true, playingChannelId }),
  closeMiniPlayer: () => set({ isVisible: false, playingChannelId: null }),
}));
