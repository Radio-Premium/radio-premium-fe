import axios from "axios";
import { useEffect } from "react";

import { useChannelStore } from "@/Channel/stores/useChannelStore";
import { BACKEND_API_URL } from "@/shared/constants/env";

const useChannels = () => {
  const { radioChannelList, setRadioChannelList } = useChannelStore();

  useEffect(() => {
    if (radioChannelList.length > 0) {
      return;
    }

    const initChannels = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_API_URL}/radio-channels`);
        setRadioChannelList(data);
      } catch (error) {
        console.error("fetch radioChannels failed: ", error);
      }
    };
    initChannels();
  }, [radioChannelList, setRadioChannelList]);
};

export default useChannels;
