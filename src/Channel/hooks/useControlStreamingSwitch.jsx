import { getChannelInfo } from "@/apis/radioChannels";
import { useChannelStore } from "@/stores/useChannelStore";
import { useMiniPlayerStore } from "@/stores/useMiniPlayerStore";
import { startStreamingPlay } from "@/utils/playControl";

const useControlStreamingSwitch = () => {
  const { setSelectedChannelId } = useChannelStore();
  const { setPlayingChannelId } = useMiniPlayerStore();

  const updateChannelState = (channelId) => {
    setSelectedChannelId(channelId);
    setPlayingChannelId(channelId);
  };

  const controlStreamingSwitch = async (videoElement, channelId) => {
    const userId = localStorage.getItem("userId");
    try {
      const { data } = await getChannelInfo(channelId, userId);
      startStreamingPlay(videoElement, data.url);
      updateChannelState(channelId);
    } catch (error) {
      console.error("fetch channelInfo failed", error);
    }
  };

  return controlStreamingSwitch;
};

export default useControlStreamingSwitch;
