export const AD_REPORT_TYPES = {
  AD: "ad",
  NOT_AD: "not-ad",
};

export const AD_REPORT_OPTIONS = {
  [AD_REPORT_TYPES.AD]: {
    parentOption: "광고입니다",
    childrenOptions: [
      { id: "move-other", label: "다른 채널로 이동하기" },
      { id: "ad-stay-current", label: "현재 채널 계속 시청하기" },
    ],
  },
  [AD_REPORT_TYPES.NOT_AD]: {
    parentOption: "광고가 아닌데 채널이 이동했습니다",
    childrenOptions: [
      { id: "move-previous", label: "다른 채널로 이동하기" },
      { id: "not-ad-stay-current", label: "현재 채널 계속 시청하기" },
    ],
  },
};
