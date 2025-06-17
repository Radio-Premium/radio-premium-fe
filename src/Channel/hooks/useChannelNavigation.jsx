import { useNavigate } from "react-router-dom";

import { useChannelStore } from "@/Channel/stores/useChannelStore";
import { ROUTES } from "@/shared/constants/routePaths";

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
    navigate(ROUTES.CHANNEL_PLAYER);
  };

  return goToChannelPlayer;
};

export default useChannelNavigation;
