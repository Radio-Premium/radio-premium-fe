import axiosInstance from "@/shared/services/axiosInstance";

export const getRadioChannels = async () => {
  const { data } = await axiosInstance.get("/radio-channels");

  return data;
};

export const getChannelInfo = async (channelId, userId) => {
  return await axiosInstance.get(`/radio-channels/${channelId}`, {
    params: { userId },
  });
};

export const getRandomNoAdChannel = async () => {
  await axiosInstance.get("/radio-channels/random-no-ad");
};
