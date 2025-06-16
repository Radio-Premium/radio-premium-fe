import axios from "axios";
import { useEffect } from "react";

import { BACKEND_API_URL } from "@/shared/constants/env";
import { useUserStore } from "@/User/stores/useUserStore";

const useUserProfile = (userId) => {
  const { setUserSettings } = useUserStore();

  useEffect(() => {
    if (!userId) {
      return;
    }

    const initUserProfile = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_URL}/users/${userId}`);
        const { isAdDetect, isReturnChannel, adRedirectChannelId } =
          response.data;
        setUserSettings({ isAdDetect, isReturnChannel, adRedirectChannelId });
      } catch (error) {
        console.error("fetch user profile failed: ", error);
      }
    };
    initUserProfile();
  }, [userId, setUserSettings]);
};

export default useUserProfile;
