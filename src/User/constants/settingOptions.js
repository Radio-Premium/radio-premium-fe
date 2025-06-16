export const SETTING_TYPES = {
  AD_DETECT: "isAdDetect",
  RETURN_CHANNEL: "isReturnChannel",
  AD_REDIRECT_CHANNEL: "adRedirectChannelId",
};

export const SETTING_TITLES = {
  [SETTING_TYPES.AD_DETECT]: "광고 감지",
  [SETTING_TYPES.RETURN_CHANNEL]: "기존 채널로 이동",
  [SETTING_TYPES.AD_REDIRECT_CHANNEL]: "광고 감지 시 이동할 채널",
};

export const SETTING_EXPLANATIONS = {
  [SETTING_TYPES.AD_DETECT]: [
    "현재 채널에서 광고를 자동 감지합니다.",
    "광고가 감지되면 다른 채널로 이동합니다.",
  ],
  [SETTING_TYPES.RETURN_CHANNEL]: [
    "이전 채널의 광고가 종료되면",
    "자동으로 복귀합니다.",
  ],
  [SETTING_TYPES.AD_REDIRECT_CHANNEL]: [
    "광고가 감지되면 자동으로 전환할 채널을 선택해 주세요.",
    "지정한 채널로 광고 중 자동 이동됩니다.",
  ],
};
