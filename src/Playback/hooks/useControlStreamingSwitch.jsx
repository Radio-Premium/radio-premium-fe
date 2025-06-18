import { getChannelInfo } from "@/Channel/services/radioChannels";
import { useChannelStore } from "@/Channel/stores/useChannelStore";
import { useMiniPlayerStore } from "@/Playback/stores/useMiniPlayerStore";
import { startStreamingPlay } from "@/Playback/utils/playControl";
import { handleAsyncError } from "@/shared/utils/handleAsyncError";

const useControlStreamingSwitch = () => {
  const { setSelectedChannelId } = useChannelStore();
  const { setPlayingChannelId } = useMiniPlayerStore();

  const updateChannelState = (channelId) => {
    setSelectedChannelId(channelId);
    setPlayingChannelId(channelId);
  };

  const controlStreamingSwitch = async (videoElement, channelId) => {
    const userId = localStorage.getItem("userId");

    await handleAsyncError(async () => {
      const { data } = await getChannelInfo(channelId, userId);
      startStreamingPlay(videoElement, data.url);
      updateChannelState(channelId);
    }, "Failed to fetch channel info:");
  };

  return controlStreamingSwitch;
};

export default useControlStreamingSwitch;
