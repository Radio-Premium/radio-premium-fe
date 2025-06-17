import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdReportModal from "@/AdReport/components/AdReportModal";
import AdReportIcon from "@/assets/svgs/icon-ad-report.svg?react";
import BackArrow from "@/assets/svgs/icon-back-arrow.svg?react";
import { useChannelStore } from "@/Channel/stores/useChannelStore";
import { REPORT_HEADER_MESSAGES } from "@/shared/constants/headerMessages";

const ReportHeader = () => {
  const isChannelChanged = useChannelStore((state) => state.isChannelChanged);
  const selectedChannelId = useChannelStore((state) => state.selectedChannelId);

  const navigate = useNavigate();
  const [isAdReportModalOpen, setIsAdReportModalOpen] = useState(false);

  const openModal = () => {
    setIsAdReportModalOpen(true);
  };

  return (
    <div className="mt-8 ml-5 flex items-center justify-between">
      <div className="flex items-center">
        <BackArrow className="cursor-pointer" onClick={() => navigate(-1)} />
      </div>
      <button
        className="mr-5 flex cursor-pointer items-center gap-1 font-bold"
        onClick={openModal}
      >
        <AdReportIcon />
        {REPORT_HEADER_MESSAGES.REPORT_BUTTON}
      </button>
      {isAdReportModalOpen && (
        <AdReportModal
          onClose={() => setIsAdReportModalOpen(false)}
          isChannelChanged={isChannelChanged}
          channelId={selectedChannelId}
        />
      )}
    </div>
  );
};

export default ReportHeader;
