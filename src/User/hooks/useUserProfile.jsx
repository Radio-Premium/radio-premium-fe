import { useEffect } from "react";

import { getUserInfo } from "@/User/services/users";
import { useUserSettingsStore } from "@/User/stores/useUserSettingsStore";

const useUserProfile = (userId) => {
  const { setSettings } = useUserSettingsStore();

  useEffect(() => {
    if (!userId) {
      return;
    }

    const initUserProfile = async () => {
      try {
        const data = await getUserInfo(userId);
        const { isAdDetect, isReturnChannel, adRedirectChannelId } = data;
        setSettings({ isAdDetect, isReturnChannel, adRedirectChannelId });
      } catch (error) {
        console.error("fetch user profile failed: ", error);
      }
    };
    initUserProfile();
  }, [userId, setSettings]);
};

export default useUserProfile;
