import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserSettingsStore = create(
  persist(
    (set) => ({
      settings: {
        isAdDetect: true,
        isReturnChannel: false,
        adRedirectChannelId: null,
      },

      setSettings: (settings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...settings,
          },
        })),
    }),
    {
      name: "user-settings-storage",
    }
  )
);
