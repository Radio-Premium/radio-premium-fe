import MainPauseIcon from "@/assets/svgs/icon-main-pause.svg?react";
import MainPlayIcon from "@/assets/svgs/icon-main-play.svg?react";
import { useChannelStore } from "@/Channel/stores/useChannelStore";
import { PLAYBACK_MODE } from "@/Playback/constants/messages";
import useChannelPlayback from "@/Playback/hooks/useChannelPlayback";
import Button from "@/shared/components/ui/Button";
import ToggleButton from "@/shared/components/ui/ToggleButton";
import { CHANNEL_MESSAGES } from "@/shared/constants/messages";
import { SETTING_TITLES, SETTING_TYPES } from "@/User/constants/settingOptions";
import useUpdateSetting from "@/User/hooks/useUpdateSetting";
import { useUserStore } from "@/User/stores/useUserStore";

const ChannelPlayer = () => {
  const { selectedChannel, isPlaying, handlePlayPause } = useChannelPlayback(
    PLAYBACK_MODE.FULL
  );
  const isChannelChanged = useChannelStore((state) => state.isChannelChanged);
  const { settings } = useUserStore();

  const { name, logoUrl } = selectedChannel;

  const settingType = isChannelChanged
    ? SETTING_TYPES.RETURN_CHANNEL
    : SETTING_TYPES.AD_DETECT;

  const buttonLabel = SETTING_TITLES[settingType];
  const updateSetting = useUpdateSetting(settingType);

  const handleToggle = () => {
    updateSetting();
  };

  return (
    <div className="relative mx-auto flex h-[calc(100vh-80px)] max-w-md flex-col px-4 pb-28">
      <div className="flex flex-1 translate-y-8 flex-col items-center justify-center">
        <img
          className="aspect-[268/257] w-[70%] max-w-[268px] rounded-md object-cover"
          src={logoUrl}
          alt={CHANNEL_MESSAGES.ALT_THUMBNAIL(name)}
        />
        <p className="mt-3.5 text-center text-lg font-bold sm:text-xl">
          {name}
        </p>
        <div className="mt-2 flex items-center gap-x-2">
          <p className="text-sm font-semibold sm:text-base">{buttonLabel}</p>
          <ToggleButton
            size="s"
            checked={settings[settingType]}
            onToggle={handleToggle}
          />
        </div>
        <Button className="mt-12" onClick={handlePlayPause}>
          {isPlaying ? (
            <MainPauseIcon className="h-[60px] w-[60px] sm:h-[75px] sm:w-[75px]" />
          ) : (
            <MainPlayIcon className="h-[60px] w-[60px] sm:h-[75px] sm:w-[75px]" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChannelPlayer;
