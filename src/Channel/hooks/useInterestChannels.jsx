import { useEffect } from "react";

import { getInterestChannels } from "@/Channel/services/interestChannels";
import { useChannelStore } from "@/Channel/stores/useChannelStore";
import { handleAsyncError } from "@/shared/utils/handleAsyncError";

const useInterestChannels = (userId) => {
  const setInterestChannelIds = useChannelStore(
    (state) => state.setInterestChannelIds
  );

  useEffect(() => {
    if (!userId) {
      return;
    }

    const getInterestIds = async () => {
      await handleAsyncError(async () => {
        const data = await getInterestChannels(userId);
        const ids = data.map((item) => item.channelId);
        setInterestChannelIds(ids);
      }, "Failed to fetch interest channel IDs:");
    };
    getInterestIds();
  }, [userId, setInterestChannelIds]);
};

export default useInterestChannels;
