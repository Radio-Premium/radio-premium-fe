import { getChannelInfo } from "@/Channel/services/radioChannels";
import { useChannelStore } from "@/Channel/stores/useChannelStore";
import { useMiniPlayerStore } from "@/Playback/stores/useMiniPlayerStore";
import { startStreamingPlay } from "@/Playback/utils/playControl";

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
