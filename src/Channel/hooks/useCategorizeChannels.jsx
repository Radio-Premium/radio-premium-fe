import { useEffect, useState } from "react";

import { useChannelStore } from "@/Channel/stores/useChannelStore";

const useCategorizeChannels = () => {
  const radioChannelList = useChannelStore((state) => state.radioChannelList);
  const interestChannelIds = useChannelStore(
    (state) => state.interestChannelIds
  );
  const [favoriteChannelList, setFavoriteChannelList] = useState([]);
  const [otherChannelList, setOtherChannelList] = useState([]);

  useEffect(() => {
    if (!radioChannelList.length) {
      return;
    }

    const favoriteList = interestChannelIds.map((interestId) =>
      radioChannelList.find((channelInfo) => channelInfo.id === interestId)
    );
    setFavoriteChannelList(favoriteList);

    const othersList = radioChannelList.filter(
      (channelInfo) => !interestChannelIds.includes(channelInfo.id)
    );
    setOtherChannelList(othersList);
  }, [radioChannelList, interestChannelIds]);

  return [favoriteChannelList, otherChannelList];
};

export default useCategorizeChannels;
