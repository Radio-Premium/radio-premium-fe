import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserSettingsStore = create(
  persist(
    (set) => ({
      userSettings: {
        isAdDetect: true,
        isReturnChannel: false,
        adRedirectChannelId: null,
      },

      setUserSettings: (userSettings) =>
        set((state) => ({
          userSettings: {
            ...state.userSettings,
            ...userSettings,
          },
        })),
    }),
    {
      name: "user-settings-storage",
    }
  )
);
