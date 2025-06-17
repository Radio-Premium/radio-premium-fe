import { useRef } from "react";

import BlankStarIcon from "@/assets/svgs/icon-blank-star.svg?react";
import useChannelNavigation from "@/Channel/hooks/useChannelNavigation";
import useToggleFavorite from "@/Channel/hooks/useToggleFavorite";
import { CHANNEL_MESSAGES } from "@/shared/constants/messages";

const ChannelListItem = ({
  thumbnail,
  channelId,
  channelName,
  backgroundColor,
}) => {
  const goToChannelPlayer = useChannelNavigation();
  const toggleFavorite = useToggleFavorite();
  const isProcessing = useRef(false);

  const handleRegisterFavoriteChannel = async (e) => {
    e.stopPropagation();
    if (isProcessing.current) {
      return;
    }

    isProcessing.current = true;
    try {
      await toggleFavorite(channelId);
    } finally {
      isProcessing.current = false;
    }
  };

  return (
    <li
      className={`my-2 flex h-16 w-full items-center rounded-md ${backgroundColor} p-2 select-none`}
      onClick={() => goToChannelPlayer(channelId)}
    >
      <img
        className="h-12 w-12"
        src={thumbnail}
        alt={CHANNEL_MESSAGES.ALT_THUMBNAIL(channelName)}
      />
      <p className="ml-3 w-3/4 text-sm font-bold">{channelName}</p>
      <button
        onClick={handleRegisterFavoriteChannel}
        disabled={isProcessing.current}
      >
        <BlankStarIcon className="ml-3" />
      </button>
    </li>
  );
};

export default ChannelListItem;
