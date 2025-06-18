import {
  createInterestChannel,
  deleteInterestChannel,
} from "@/Channel/services/interestChannels";
import { useChannelStore } from "@/Channel/stores/useChannelStore";
import { handleAsyncError } from "@/shared/utils/handleAsyncError";
import useUserId from "@/User/hooks/useUserId";

const useToggleFavorite = () => {
  const { interestChannelIds, setInterestChannelIds } = useChannelStore();
  const userId = Number(useUserId());

  const toggleFavorite = async (channelId) => {
    if (typeof userId !== "number" || typeof channelId !== "number") {
      return;
    }

    const isFavorite = interestChannelIds.includes(channelId);

    if (isFavorite) {
      await handleAsyncError(async () => {
        await deleteInterestChannel(userId, channelId);
        setInterestChannelIds(
          interestChannelIds.filter((id) => id !== channelId)
        );
      }, "Failed to delete interest channel:");
    } else {
      await handleAsyncError(async () => {
        await createInterestChannel(userId, channelId);
        setInterestChannelIds([...interestChannelIds, channelId]);
      }, "Failed to create interest channel:");
    }
  };

  return toggleFavorite;
};

export default useToggleFavorite;
