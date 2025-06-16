import { useRef } from "react";

import { useChannelStore } from "@/Channel/stores/useChannelStore";
import { useMiniPlayerStore } from "@/Playback/stores/useMiniPlayerStore";
import { usePlayingStore } from "@/Playback/stores/usePlayingStore";
import { controlStreamingPlayback } from "@/Playback/utils/playControl";
import { useVideoElementStore } from "@/shared/stores/useVideoElementStore";
import { SETTING_TYPES } from "@/User/constants/settingOptions";
import { useUserStore } from "@/User/stores/useUserStore";

const useChannelPlayback = (mode) => {
  const videoElement = useVideoElementStore((state) => state.videoElement);
  const { selectedChannelId, radioChannelList } = useChannelStore();
  const { playingChannelId, openMiniPlayer } = useMiniPlayerStore();
  const { isPlaying, setIsPlaying } = usePlayingStore();
  const { settings } = useUserStore();

  const isProcessing = useRef(false);

  const isAdDetect = settings[SETTING_TYPES.AD_DETECT];

  const isMiniMode = mode === "mini";
  const targetChannelId = isMiniMode ? playingChannelId : selectedChannelId;

  const selectedChannel = radioChannelList.find(
    ({ id }) => id === targetChannelId
  );

  const isCurrentPlaying = isMiniMode
    ? isPlaying && playingChannelId !== null
    : isPlaying && selectedChannelId === playingChannelId;

  const handlePlayPause = async () => {
    if (!isCurrentPlaying) {
      await controlStreamingPlayback(
        videoElement,
        targetChannelId,
        false,
        isAdDetect
      );
      openMiniPlayer(targetChannelId);
      setIsPlaying(true);
    } else {
      await controlStreamingPlayback(
        videoElement,
        targetChannelId,
        true,
        isAdDetect
      );
      setIsPlaying(false);
    }
  };

  const preventDuplicateClick = async (e) => {
    e.stopPropagation();

    if (isProcessing.current) {
      return;
    }

    isProcessing.current = true;
    try {
      await handlePlayPause();
    } finally {
      isProcessing.current = false;
    }
  };

  return {
    selectedChannel,
    isPlaying: isCurrentPlaying,
    handlePlayPause: preventDuplicateClick,
  };
};

export default useChannelPlayback;
