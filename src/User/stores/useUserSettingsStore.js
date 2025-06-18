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

      setUserSettings: (updatedSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...updatedSettings,
          },
        })),
    }),
    {
      name: "user-settings-storage",
    }
  )
);
