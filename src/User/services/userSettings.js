import axiosInstance from "@/shared/services/axiosInstance";

export const updateUserSettings = async (userId, updatedSettings) => {
  return await axiosInstance.patch(
    `/users/${userId}/settings`,
    updatedSettings
  );
};
