import SelectIcon from "@/assets/svgs/icon-select.svg?react";
import Button from "@/shared/components/ui/Button";

const AdRedirectChannelItem = ({
  channelId,
  channelName,
  thumbnail,
  isSelected,
  onSelect,
}) => {
  const borderColor = isSelected ? "border-indigo-500" : "border-gray-200";

  return (
    <li
      className={`${borderColor} my-2 flex h-16 w-full items-center rounded-md border bg-white px-6 py-2 select-none`}
      onClick={() => onSelect(channelId)}
    >
      <img
        className="h-12 w-12 rounded-[50%]"
        src={thumbnail}
        alt={`${channelName} 썸네일`}
      />
      <p className="ml-3 w-3/4 text-sm font-bold">{channelName}</p>
      {isSelected && (
        <Button>
          <SelectIcon className="ml-3" />
        </Button>
      )}
    </li>
  );
};

export default AdRedirectChannelItem;
