import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChannelStore = create(
  persist(
    (set) => ({
      interestChannelIds: [],
      isChannelChanged: false,
      prevChannelId: null,
      radioChannelList: [],
      selectedChannelId: null,

      setInterestChannelIds: (interestChannelIds) =>
        set({ interestChannelIds }),
      setIsChannelChanged: (isChanged) => set({ isChannelChanged: isChanged }),
      setPrevChannelId: (channelId) => set({ prevChannelId: channelId }),
      setRadioChannelList: (channelList) =>
        set({ radioChannelList: channelList }),
      setSelectedChannelId: (channelId) =>
        set({ selectedChannelId: channelId }),
    }),
    {
      name: "channel-storage",
    }
  )
);
