import ChannelSection from "@/Channel/components/ChannelSection";
import { useChannelStore } from "@/Channel/stores/useChannelStore";
import TabBar from "@/shared/components/TabBar";
import AdRedirectChannelItem from "@/User/components/AdRedirectChannelItem";
import SettingListItem from "@/User/components/SettingListItem";
import {
  SETTING_TYPES,
  SETTING_TITLES,
  SETTING_EXPLANATIONS,
} from "@/User/constants/settingOptions";
import useUpdateSetting from "@/User/hooks/useUpdateSetting";
import { useUserStore } from "@/User/stores/useUserStore";

const Settings = () => {
  const channelList = useChannelStore((state) => state.radioChannelList);
  const isAdDetect = useUserStore((state) => state.settings.isAdDetect);
  const adRedirectChannelId = useUserStore(
    (state) => state.settings.adRedirectChannelId
  );
  const updateAdRedirectChannelId = useUpdateSetting(
    SETTING_TYPES.AD_REDIRECT_CHANNEL
  );

  const settingTypes = Object.values(SETTING_TYPES);

  const handleSelectRedirectChannel = (channelId) => {
    const updatedChannelId =
      adRedirectChannelId === channelId ? null : channelId;
    updateAdRedirectChannelId(updatedChannelId);
  };

  const adRedirectChannelList = channelList
    .filter((channel) => !channel.isAdChannel)
    .map(({ id, name, logoUrl }) => ({ id, name, logoUrl, isSelected: false }));

  return (
    <>
      <TabBar />
      <div className="px-4 pt-4">
        <ul>
          {settingTypes.map(
            (type) =>
              type !== SETTING_TYPES.AD_REDIRECT_CHANNEL && (
                <SettingListItem
                  key={type}
                  type={type}
                  title={SETTING_TITLES[type]}
                  explanations={SETTING_EXPLANATIONS[type]}
                />
              )
          )}
        </ul>
      </div>
      {isAdDetect && (
        <div data-testid="no-ad-channel-list" className="px-4 pt-2">
          <ChannelSection
            title={SETTING_TITLES[SETTING_TYPES.AD_REDIRECT_CHANNEL]}
            subTitleList={
              SETTING_EXPLANATIONS[SETTING_TYPES.AD_REDIRECT_CHANNEL]
            }
            marginTop="mt-2"
            height="h-80"
          >
            {adRedirectChannelList.map(({ id, name, logoUrl }) => (
              <AdRedirectChannelItem
                key={id}
                channelId={id}
                channelName={name}
                thumbnail={logoUrl}
                isSelected={adRedirectChannelId === id}
                onSelect={handleSelectRedirectChannel}
              />
            ))}
          </ChannelSection>
        </div>
      )}
    </>
  );
};

export default Settings;
