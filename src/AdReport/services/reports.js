import axiosInstance from "@/shared/services/axiosInstance";

export const createAdReport = async ({
  userId,
  isAd,
  detectedAdPhrase,
  channelId,
}) => {
  const { data } = await axiosInstance.post("/reports", {
    userId,
    isAd,
    detectedAdPhrase,
    channelId,
  });

  return data;
};
