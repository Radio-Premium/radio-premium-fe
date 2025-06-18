import { createAdReport } from "@/AdReport/services/reports";

const useSubmitAdReport = () => {
  const reportAd = async ({ userId, isAd, detectedAdPhrase, channelId }) => {
    try {
      return await createAdReport({
        userId,
        isAd,
        detectedAdPhrase,
        channelId,
      });
    } catch (error) {
      console.error("fetch ad report failed:", error);
    }
  };

  return reportAd;
};

export default useSubmitAdReport;
