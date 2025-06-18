import { useCallback } from "react";

import { getRandomNoAdChannel } from "@/Channel/services/radioChannels";
import { useChannelStore } from "@/Channel/stores/useChannelStore";
import useControlStreamingSwitch from "@/Playback/hooks/useControlStreamingSwitch";
import { useVideoElementStore } from "@/shared/stores/useVideoElementStore";
import { handleAsyncError } from "@/shared/utils/handleAsyncError";
import { useUserSettingsStore } from "@/User/stores/useUserSettingsStore";

const useChannelSwitch = () => {
  const videoElement = useVideoElementStore((state) => state.videoElement);
  const prevChannelId = useChannelStore((state) => state.prevChannelId);
  const selectedChannelId = useChannelStore((state) => state.selectedChannelId);
  const setIsChannelChanged = useChannelStore(
    (state) => state.setIsChannelChanged
  );
  const setPrevChannelId = useChannelStore((state) => state.setPrevChannelId);
  const adRedirectChannelId = useUserSettingsStore(
    (state) => state.settings.adRedirectChannelId
  );
  const controlStreamingSwitch = useControlStreamingSwitch();

  const handleChannelSwitch = useCallback(
    async (isAd) => {
      await handleAsyncError(async () => {
        let channelId = 0;

        if (isAd) {
          await handleAsyncError(async () => {
            if (adRedirectChannelId === null) {
              const { data } = await getRandomNoAdChannel();
              channelId = data.id;
            } else {
              channelId = adRedirectChannelId;
            }

            setIsChannelChanged(true);
            setPrevChannelId(selectedChannelId);
          }, "Failed to fetch random no-ad channel:");
        } else {
          if (prevChannelId === null || prevChannelId === undefined) {
            return;
          }

          channelId = prevChannelId;
          setIsChannelChanged(false);
          setPrevChannelId(null);
        }

        await controlStreamingSwitch(videoElement, channelId);
      }, "Failed to switch channel:");
    },
    [
      prevChannelId,
      selectedChannelId,
      adRedirectChannelId,
      setIsChannelChanged,
      setPrevChannelId,
      videoElement,
      controlStreamingSwitch,
    ]
  );

  return handleChannelSwitch;
};

export default useChannelSwitch;
