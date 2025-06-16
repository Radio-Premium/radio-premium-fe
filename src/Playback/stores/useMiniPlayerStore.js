import { create } from "zustand";

export const useMiniPlayerStore = create((set) => ({
  isVisible: false,
  playingChannelId: null,

  setPlayingChannelId: (channelId) => set({ playingChannelId: channelId }),
  openMiniPlayer: (channelId) =>
    set({ isVisible: true, playingChannelId: channelId }),
  closeMiniPlayer: () => set({ isVisible: false, playingChannelId: null }),
}));
