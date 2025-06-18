import Hls from "hls.js";

import { getChannelInfo } from "@/Channel/services/radioChannels";
import { postWhisper } from "@/Playback/services/whisper";
import { stopWhisperServer } from "@/Playback/utils/stopWhisperServer";

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
    try {
      const { data } = await getChannelInfo(channelId, userId);
      const streamingUrl = data.url;
      if (isAdDetect) {
        await postWhisper({ streamingUrl, userId, channelId });
      }
      startStreamingPlay(video, streamingUrl);
    } catch (error) {
      console.error("fetch channelInfo failed", error);
    }
  } else {
    video.pause();
    stopWhisperServer(userId);
  }
};
