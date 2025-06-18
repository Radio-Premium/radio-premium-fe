import { useEffect } from "react";

import { getRadioChannels } from "@/Channel/services/radioChannels";
import { useChannelStore } from "@/Channel/stores/useChannelStore";
import { handleAsyncError } from "@/shared/utils/handleAsyncError";

const useChannels = () => {
  const { radioChannelList, setRadioChannelList } = useChannelStore();

  useEffect(() => {
    if (radioChannelList.length > 0) {
      return;
    }

    const initChannels = () => {
      handleAsyncError(async () => {
        const data = await getRadioChannels();
        setRadioChannelList(data);
      }, "Failed to fetch radio channels:");
    };
    initChannels();
  }, [radioChannelList, setRadioChannelList]);
};

export default useChannels;
