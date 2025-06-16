import axiosInstance from "@/shared/services/axiosInstance";

export const createInterestChannel = (userId, channelId) =>
  axiosInstance.post(`/users/${userId}/interest-channels`, {
    channelId,
  });

export const deleteInterestChannel = (userId, channelId) =>
  axiosInstance.delete(`/users/${userId}/interest-channels`, {
    data: { channelId },
  });

export const updateInterestChannels = (userId, channelIds) =>
  axiosInstance.put(`/users/${userId}/interest-channels`, {
    channelIds,
  });
