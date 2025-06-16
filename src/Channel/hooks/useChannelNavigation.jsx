import { useNavigate } from "react-router-dom";

import { useChannelStore } from "@/Channel/stores/useChannelStore";

const useChannelNavigation = () => {
  const navigate = useNavigate();
  const setSelectedChannelId = useChannelStore(
    (state) => state.setSelectedChannelId
  );
  const setIsChannelChanged = useChannelStore(
    (state) => state.setIsChannelChanged
  );

  const goToChannelPlayer = (channelId) => {
    setSelectedChannelId(channelId);
    setIsChannelChanged(false);
    navigate("/channel-player");
  };

  return goToChannelPlayer;
};

export default useChannelNavigation;
