import { handleAsyncError } from "@/shared/utils/handleAsyncError";
import { SETTING_TYPES } from "@/User/constants/settingOptions";
import { updateUserSettings } from "@/User/services/userSettings";
import { useUserSettingsStore } from "@/User/stores/useUserSettingsStore";

const useUpdateSetting = (type) => {
  const { settings, setUserSettings } = useUserSettingsStore();

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

    await handleAsyncError(async () => {
      await updateUserSettings(userId, updatedSettings);
      setUserSettings(updatedSettings);
    }, "Failed to update user setting:");
  };

  return updateSetting;
};

export default useUpdateSetting;
