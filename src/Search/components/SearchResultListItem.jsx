import { memo } from "react";

import BlankStarIcon from "@/assets/svgs/icon-blank-star.svg?react";
import FilledStarIcon from "@/assets/svgs/icon-filled-star.svg?react";
import { CHANNEL_MESSAGES } from "@/shared/constants/messages";

const SearchResultListItem = ({
  thumbnail,
  channelId,
  channelName,
  backgroundColor,
  isFavorite = false,
  onClick,
  onToggleFavorite,
}) => {
  return (
    <li
      className={`my-2 flex h-16 w-full items-center rounded-md ${backgroundColor} px-6 py-2 select-none`}
      onClick={() => onClick(channelId)}
    >
      <img
        className="h-12 w-12 rounded-[50%]"
        src={thumbnail}
        alt={CHANNEL_MESSAGES.ALT_THUMBNAIL(channelName)}
      />
      <p className="ml-3 w-3/4 text-sm font-bold">{channelName}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(channelId);
        }}
      >
        {isFavorite ? (
          <FilledStarIcon className="ml-3" />
        ) : (
          <BlankStarIcon className="ml-3" />
        )}
      </button>
    </li>
  );
};

export default memo(SearchResultListItem);
