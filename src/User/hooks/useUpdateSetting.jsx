import axios from "axios";

import { BACKEND_API_URL } from "@/shared/constants/env";
import { SETTING_TYPES } from "@/User/constants/settingOptions";
import { useUserStore } from "@/User/stores/useUserStore";

const useUpdateSetting = (type) => {
  const { settings, setUserSettings } = useUserStore();

  const updateSetting = async (value) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return;
    }

    const isToggleType = type !== SETTING_TYPES.AD_REDIRECT_CHANNEL;
    const toggledValue = isToggleType ? !settings[type] : value;

    const updatedSettings = {
      [type]: toggledValue,
    };

    if (type === SETTING_TYPES.AD_DETECT && !toggledValue) {
      updatedSettings[SETTING_TYPES.RETURN_CHANNEL] = false;
    }

    try {
      await axios.patch(
        `${BACKEND_API_URL}/users/${userId}/settings`,
        updatedSettings
      );
      setUserSettings(updatedSettings);
    } catch (error) {
      console.error("setting change failed", error);
    }
  };

  return updateSetting;
};

export default useUpdateSetting;
