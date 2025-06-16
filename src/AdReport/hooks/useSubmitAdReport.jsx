import axios from "axios";

import { BACKEND_API_URL } from "@/shared/constants/env";

const useSubmitAdReport = () => {
  const reportAd = async ({ userId, isAd, detectedAdPhrase, channelId }) => {
    try {
      const { data } = await axios.post(`${BACKEND_API_URL}/reports`, {
        userId,
        isAd,
        detectedAdPhrase,
        channelId,
      });

      return data;
    } catch (error) {
      console.error("fetch ad report failed:", error);
    }
  };

  return reportAd;
};

export default useSubmitAdReport;
