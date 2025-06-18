import { memo, useCallback } from "react";

import Checkbox from "@/shared/components/ui/Checkbox";

const ToggleCheckbox = ({
  isSelected,
  onSelect,
  parentOption,
  childrenOptions,
  selectedSubOptionId,
  onSelectSubOption,
}) => {
  const handleParentClick = useCallback(() => {
    onSelect();
    onSelectSubOption(null);
  }, [onSelect, onSelectSubOption]);

  const toggleChildOption = useCallback(
    (id) => {
      onSelectSubOption(selectedSubOptionId === id ? null : id);
    },
    [onSelectSubOption, selectedSubOptionId]
  );

  return (
    <>
      <Checkbox
        checked={isSelected}
        onChange={handleParentClick}
        labelClassName="text-[16px] whitespace-nowrap"
        inputClassName="h-[20px] min-h-[20px] w-[20px] min-w-[20px]"
      >
        {parentOption}
      </Checkbox>
      {isSelected && (
        <div className="mt-[3px] ml-5 flex flex-col gap-[4px]">
          {childrenOptions.map(({ id, label }) => (
            <Checkbox
              key={id}
              checked={selectedSubOptionId === id}
              onChange={() => toggleChildOption(id)}
              labelClassName="text-[16px] whitespace-nowrap"
              inputClassName="h-[18px] min-h-[18px] w-[18px] min-w-[18px]"
            >
              {label}
            </Checkbox>
          ))}
        </div>
      )}
    </>
  );
};

export default memo(ToggleCheckbox);
