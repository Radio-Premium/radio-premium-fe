import { createAdReport } from "@/AdReport/services/reports";
import { handleAsyncError } from "@/shared/utils/handleAsyncError";

const useSubmitAdReport = () => {
  const reportAd = async ({ userId, isAd, detectedAdPhrase, channelId }) => {
    return handleAsyncError(
      () => createAdReport({ userId, isAd, detectedAdPhrase, channelId }),
      "Failed to create ad report:"
    );
  };

  return reportAd;
};

export default useSubmitAdReport;
