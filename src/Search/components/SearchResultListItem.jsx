import BlankStarIcon from "@/assets/svgs/icon-blank-star.svg?react";
import FilledStarIcon from "@/assets/svgs/icon-filled-star.svg?react";
import useChannelNavigation from "@/Channel/hooks/useChannelNavigation";
import useToggleFavorite from "@/Channel/hooks/useToggleFavorite";
import { CHANNEL_MESSAGES } from "@/shared/constants/messages";

const SearchResultListItem = ({
  thumbnail,
  channelId,
  channelName,
  backgroundColor,
  isFavorite = false,
}) => {
  const goToChannelPlayer = useChannelNavigation();
  const toggleFavorite = useToggleFavorite();

  return (
    <li
      className={`my-2 flex h-16 w-full items-center rounded-md ${backgroundColor} px-6 py-2 select-none`}
      onClick={() => goToChannelPlayer(channelId)}
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
          toggleFavorite(channelId);
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

export default SearchResultListItem;
