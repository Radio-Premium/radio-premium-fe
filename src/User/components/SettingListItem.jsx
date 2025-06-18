import ToggleButton from "@/shared/components/ui/ToggleButton";
import { SETTING_TYPES } from "@/User/constants/settingOptions";
import useUpdateSetting from "@/User/hooks/useUpdateSetting";
import { useUserSettingsStore } from "@/User/stores/useUserSettingsStore";

const SettingListItem = ({ type, title, explanations }) => {
  const { settings } = useUserSettingsStore();
  const updateSetting = useUpdateSetting(type);

  const handleToggle = () => {
    updateSetting();
  };

  return (
    <li className="my-4 flex h-[100px] w-full min-w-80 rounded-md bg-gray-100 px-4 pt-4">
      <div className="w-[280px]">
        <h2 className="text-lg font-semibold">{title}</h2>
        {explanations.map((explanation, index) =>
          index === 0 ? (
            <p key={index} className="mt-1 mb-[-2px] text-sm text-[#888888]">
              {explanation}
            </p>
          ) : (
            <p key={index} className="text-sm text-[#888888]">
              {explanation}
            </p>
          )
        )}
      </div>
      <div className="my-auto ml-auto">
        <ToggleButton
          checked={settings[type]}
          onToggle={handleToggle}
          disabled={
            type === SETTING_TYPES.RETURN_CHANNEL && !settings.isAdDetect
          }
        />
      </div>
    </li>
  );
};

export default SettingListItem;
