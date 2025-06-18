import { useState, useRef, useCallback } from "react";

import ToggleCheckbox from "@/AdReport/components/ToggleCheckbox";
import {
  AD_REPORT_TYPES,
  AD_REPORT_OPTIONS,
} from "@/AdReport/constants/adReportOptions";
import { AD_REPORT_MESSAGES } from "@/AdReport/constants/messages";
import useSubmitAdReport from "@/AdReport/hooks/useSubmitAdReport";
import useChannelSwitch from "@/Channel/hooks/useChannelSwitch";
import Button from "@/shared/components/ui/Button";
import Modal from "@/shared/components/ui/Modal";
import useUserId from "@/User/hooks/useUserId";

const AdReportModal = ({ isChannelChanged, channelId, onClose }) => {
  const handleChannelSwitch = useChannelSwitch();
  const [selectedParentOption, setSelectedParentOption] = useState(null);
  const [selectedChildOption, setSelectedChildOption] = useState(null);
  const userAdPhrase = useRef("");

  const submitAdReport = useSubmitAdReport();
  const userId = useUserId();

  const availableReportOptions = Object.entries(AD_REPORT_OPTIONS).filter(
    ([key]) => {
      if (isChannelChanged) {
        return true;
      }

      return key === AD_REPORT_TYPES.AD;
    }
  );

  const toggleParentOption = useCallback((option) => {
    setSelectedParentOption((prev) => (prev === option ? null : option));
  }, []);

  const handleSubmit = useCallback(async () => {
    const isAd = selectedParentOption === AD_REPORT_TYPES.AD;

    await submitAdReport({
      userId: Number(userId),
      isAd,
      detectedAdPhrase: userAdPhrase.current || null,
      channelId,
    });

    onClose();

    if (
      selectedChildOption === "ad-stay-current" ||
      selectedChildOption === "not-ad-stay-current"
    ) {
      return;
    }

    if (
      selectedChildOption === "move-other" ||
      selectedChildOption === "move-previous"
    ) {
      handleChannelSwitch(isAd);
    }
  }, [
    selectedParentOption,
    selectedChildOption,
    submitAdReport,
    userId,
    channelId,
    onClose,
    handleChannelSwitch,
  ]);

  return (
    <Modal
      title={AD_REPORT_MESSAGES.MODAL_TITLE}
      subTitle={AD_REPORT_MESSAGES.MODAL_SUBTITLE}
    >
      <div className="absolute inset-0 flex flex-col justify-between px-1">
        <div className="max-h-[160px] overflow-hidden">
          {availableReportOptions.map(
            ([key, { parentOption, childrenOptions }]) => (
              <ToggleCheckbox
                key={key}
                isSelected={selectedParentOption === key}
                onSelect={() => toggleParentOption(key)}
                parentOption={parentOption}
                childrenOptions={childrenOptions}
                selectedSubOptionId={selectedChildOption}
                onSelectSubOption={setSelectedChildOption}
              />
            )
          )}
        </div>
        <div className="w-full">
          <label
            htmlFor="adPhraseInput"
            className="mb-2 block text-left text-sm text-gray-600"
          >
            {AD_REPORT_MESSAGES.INPUT_LABEL}
          </label>
          <input
            id="adPhraseInput"
            type="text"
            placeholder={AD_REPORT_MESSAGES.INPUT_PLACEHOLDER}
            defaultValue=""
            onChange={(e) => (userAdPhrase.current = e.target.value)}
            className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <div className="flex justify-end gap-x-2">
            <Button
              className="flex h-[35px] w-[75px] items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-[16px] text-black hover:bg-gray-100"
              onClick={onClose}
            >
              {AD_REPORT_MESSAGES.BUTTON_CANCEL}
            </Button>
            <Button
              className="flex h-[35px] w-[75px] items-center justify-center rounded-md bg-[#5B4DFF] px-4 py-2 text-[16px] text-white hover:bg-[#4F46E5] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
              onClick={handleSubmit}
              disabled={!selectedParentOption || !selectedChildOption}
            >
              {AD_REPORT_MESSAGES.BUTTON_CONFIRM}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdReportModal;
