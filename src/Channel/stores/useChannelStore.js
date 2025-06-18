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
      setIsChannelChanged: (isChannelChanged) => set({ isChannelChanged }),
      setPrevChannelId: (prevChannelId) => set({ prevChannelId }),
      setRadioChannelList: (radioChannelList) => set({ radioChannelList }),
      setSelectedChannelId: (selectedChannelId) => set({ selectedChannelId }),
    }),
    {
      name: "channel-storage",
    }
  )
);
