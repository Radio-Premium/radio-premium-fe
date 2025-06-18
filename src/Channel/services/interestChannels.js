import axiosInstance from "@/shared/services/axiosInstance";

export const createInterestChannel = async (userId, channelId) => {
  await axiosInstance.post(`/users/${userId}/interest-channels`, {
    channelId,
  });
};

export const getInterestChannels = async (userId) => {
  const { data } = await axiosInstance.get(
    `/users/${userId}/interest-channels`
  );

  return data;
};

export const updateInterestChannels = async (userId, channelIds) => {
  await axiosInstance.put(`/users/${userId}/interest-channels`, {
    channelIds,
  });
};

export const deleteInterestChannel = async (userId, channelId) => {
  await axiosInstance.delete(`/users/${userId}/interest-channels`, {
    data: { channelId },
  });
};
