import { useEffect } from "react";

import { handleAsyncError } from "@/shared/utils/handleAsyncError";
import { getUserInfo } from "@/User/services/users";
import { useUserSettingsStore } from "@/User/stores/useUserSettingsStore";

const useUserProfile = (userId) => {
  const { setUserSettings } = useUserSettingsStore();

  useEffect(() => {
    if (!userId) {
      return;
    }

    const initUserProfile = async () => {
      await handleAsyncError(async () => {
        const data = await getUserInfo(userId);
        const { isAdDetect, isReturnChannel, adRedirectChannelId } = data;
        setUserSettings({ isAdDetect, isReturnChannel, adRedirectChannelId });
      }, "Failed to fetch user profile:");
    };
    initUserProfile();
  }, [userId, setUserSettings]);
};

export default useUserProfile;
