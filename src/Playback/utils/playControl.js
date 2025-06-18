import Hls from "hls.js";

import { getChannelInfo } from "@/Channel/services/radioChannels";
import { postWhisper } from "@/Playback/services/whisper";
import { stopWhisperServer } from "@/Playback/utils/stopWhisperServer";
import { handleAsyncError } from "@/shared/utils/handleAsyncError";

const userId = localStorage.getItem("userId");
let hlsInstance = null;

export const startStreamingPlay = (video, url) => {
  if (hlsInstance) {
    hlsInstance.destroy();
    hlsInstance = null;
  }

  if (Hls.isSupported()) {
    hlsInstance = new Hls();
    hlsInstance.loadSource(url);
    hlsInstance.attachMedia(video);
    hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play();
    });
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
    video.play();
  }
};

export const controlStreamingPlayback = async (
  video,
  channelId,
  isPlaying,
  isAdDetect
) => {
  if (!isPlaying) {
    await handleAsyncError(async () => {
      const { data } = await getChannelInfo(channelId, userId);
      const streamingUrl = data.url;

      if (isAdDetect) {
        await handleAsyncError(
          () => postWhisper({ streamingUrl, userId, channelId }),
          "Failed to start ad detection:"
        );
      }

      startStreamingPlay(video, streamingUrl);
    }, "Failed to fetch channel info:");
  } else {
    video.pause();
    stopWhisperServer(userId);
  }
};
