import {
  createInterestChannel,
  deleteInterestChannel,
} from "@/Channel/services/interestChannels";
import { useChannelStore } from "@/Channel/stores/useChannelStore";
import useUserId from "@/User/hooks/useUserId";

const useToggleFavorite = () => {
  const { interestChannelIds, setInterestChannelIds } = useChannelStore();
  const userId = Number(useUserId());

  const toggleFavorite = async (channelId) => {
    if (typeof userId !== "number" || typeof channelId !== "number") {
      return;
    }

    const isFavorite = interestChannelIds.includes(channelId);

    try {
      if (isFavorite) {
        await deleteInterestChannel(userId, channelId);
        setInterestChannelIds(
          interestChannelIds.filter((id) => id !== channelId)
        );
      } else {
        await createInterestChannel(userId, channelId);
        setInterestChannelIds([...interestChannelIds, channelId]);
      }
    } catch (error) {
      console.error("fetch toggleFavorite failed: ", error);
    }
  };

  return toggleFavorite;
};

export default useToggleFavorite;
