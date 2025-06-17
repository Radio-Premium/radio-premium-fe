import CloseIcon from "@/assets/svgs/icon-close.svg?react";
import PauseIcon from "@/assets/svgs/icon-mini-pause.svg?react";
import PlayIcon from "@/assets/svgs/icon-mini-play.svg?react";
import useChannelNavigation from "@/Channel/hooks/useChannelNavigation";
import { PLAYBACK_MODE } from "@/Playback/constants/messages";
import useChannelPlayback from "@/Playback/hooks/useChannelPlayback";
import { useMiniPlayerStore } from "@/Playback/stores/useMiniPlayerStore";
import { usePlayingStore } from "@/Playback/stores/usePlayingStore";
import { stopWhisperServer } from "@/Playback/utils/stopWhisperServer";
import Button from "@/shared/components/ui/Button";
import { CHANNEL_MESSAGES } from "@/shared/constants/messages";
import { useVideoElementStore } from "@/shared/stores/useVideoElementStore";

const MiniPlayer = () => {
  const videoElement = useVideoElementStore((state) => state.videoElement);
  const goToChannelPlayer = useChannelNavigation();
  const { selectedChannel, isPlaying, handlePlayPause } = useChannelPlayback(
    PLAYBACK_MODE.MINI
  );
  const { playingChannelId, closeMiniPlayer } = useMiniPlayerStore();
  const { setIsPlaying } = usePlayingStore();
  const { name, logoUrl } = selectedChannel;

  const handleClose = (e) => {
    e.stopPropagation();

    videoElement.pause();
    videoElement.src = "";
    setIsPlaying(false);
    closeMiniPlayer();

    const userId = localStorage.getItem("userId");
    stopWhisperServer(userId);
  };

  return (
    <div
      className="absolute bottom-0 flex h-20 w-full justify-between rounded-t-4xl bg-white px-4 shadow-[0_-6px_9px_rgba(0,0,0,0.3)]"
      onClick={() => goToChannelPlayer(playingChannelId)}
    >
      <div className="flex items-center">
        <img
          className="ml-2 h-16 w-16"
          src={logoUrl}
          alt={CHANNEL_MESSAGES.ALT_THUMBNAIL(name)}
        />
        <p className="ml-2 text-sm font-black">{name}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={handlePlayPause}>
          {!isPlaying ? (
            <PlayIcon className="h-9 w-9 cursor-pointer" />
          ) : (
            <PauseIcon className="cursor-pointer" />
          )}
        </Button>
        <Button onClick={handleClose}>
          <CloseIcon className="cursor-pointer" />
        </Button>
      </div>
    </div>
  );
};

export default MiniPlayer;
