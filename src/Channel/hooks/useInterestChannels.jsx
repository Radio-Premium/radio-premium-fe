import { useEffect } from "react";

import { getInterestChannels } from "@/Channel/services/interestChannels";
import { useChannelStore } from "@/Channel/stores/useChannelStore";

const useInterestChannels = (userId) => {
  const setInterestChannelIds = useChannelStore(
    (state) => state.setInterestChannelIds
  );

  useEffect(() => {
    if (!userId) {
      return;
    }

    const getInterestIds = async () => {
      try {
        const data = await getInterestChannels(userId);
        const ids = data.map((item) => item.channelId);
        setInterestChannelIds(ids);
      } catch (error) {
        console.error("fetch interestIds failed: ", error);
      }
    };
    getInterestIds();
  }, [userId, setInterestChannelIds]);
};

export default useInterestChannels;
