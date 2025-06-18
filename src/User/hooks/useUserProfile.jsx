import { useEffect } from "react";

import { getUserInfo } from "@/User/services/users";
import { useUserStore } from "@/User/stores/useUserStore";

const useUserProfile = (userId) => {
  const { setUserSettings } = useUserStore();

  useEffect(() => {
    if (!userId) {
      return;
    }

    const initUserProfile = async () => {
      try {
        const data = await getUserInfo(userId);
        const { isAdDetect, isReturnChannel, adRedirectChannelId } = data;
        setUserSettings({ isAdDetect, isReturnChannel, adRedirectChannelId });
      } catch (error) {
        console.error("fetch user profile failed: ", error);
      }
    };
    initUserProfile();
  }, [userId, setUserSettings]);
};

export default useUserProfile;
