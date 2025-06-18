import axiosInstance from "@/shared/services/axiosInstance";

export const postWhisper = async ({ streamingUrl, userId, channelId }) => {
  await axiosInstance.post("/whisper", {
    streamingUrl,
    userId,
    channelId,
  });
};
