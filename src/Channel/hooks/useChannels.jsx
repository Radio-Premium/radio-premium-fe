import { useEffect } from "react";

import { getRadioChannels } from "@/Channel/services/radioChannels";
import { useChannelStore } from "@/Channel/stores/useChannelStore";

const useChannels = () => {
  const { radioChannelList, setRadioChannelList } = useChannelStore();

  useEffect(() => {
    if (radioChannelList.length > 0) {
      return;
    }

    const initChannels = async () => {
      try {
        const data = await getRadioChannels();
        setRadioChannelList(data);
      } catch (error) {
        console.error("fetch radioChannels failed: ", error);
      }
    };
    initChannels();
  }, [radioChannelList, setRadioChannelList]);
};

export default useChannels;
