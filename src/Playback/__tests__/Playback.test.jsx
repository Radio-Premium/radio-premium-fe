import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

import ChannelPlayer from "@/Playback/components/ChannelPlayer";
import useChannelPlayback from "@/Playback/hooks/useChannelPlayback";
import useUpdateSetting from "@/User/hooks/useUpdateSetting";
import { useUserSettingsStore } from "@/User/stores/useUserSettingsStore";

const mockSelectedChannel = {
  name: "테스트 채널",
  logoUrl: "https://example.com/test.jpg",
};

let mockIsChannelChanged = false;
let mockIsPlaying = false;

vi.mock("@/Channel/stores/useChannelStore", () => ({
  useChannelStore: (selector) =>
    selector({
      isChannelChanged: mockIsChannelChanged,
    }),
}));

vi.mock("@/User/stores/useUserSettingsStore", () => ({
  useUserSettingsStore: vi.fn(),
}));

vi.mock("@/Playback/hooks/useChannelPlayback", () => ({
  default: vi.fn(),
}));

vi.mock("@/User/hooks/useUpdateSetting", () => ({
  default: vi.fn(),
}));

vi.mock("@/User/constants/settingOptions", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    SETTING_TITLES: {
      ...actual.SETTING_TITLES,
      AD_DETECT: "광고 감지",
      RETURN_CHANNEL: "기존 채널로 이동",
    },
  };
});

describe("ChannelPlayer", () => {
  const mockUpdateSetting = vi.fn();
  const mockHandlePlayPause = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useUserSettingsStore.mockReturnValue({
      settings: {
        RETURN_CHANNEL: true,
        AD_DETECT: true,
      },
    });

    useChannelPlayback.mockReturnValue({
      selectedChannel: mockSelectedChannel,
      isPlaying: mockIsPlaying,
      handlePlayPause: mockHandlePlayPause,
    });

    useUpdateSetting.mockReturnValue(mockUpdateSetting);
  });

  it("초기 렌더링 시 채널 이름과 썸네일을 표시한다", () => {
    mockIsChannelChanged = true;

    render(<ChannelPlayer />);

    expect(screen.getByText(mockSelectedChannel.name)).toBeInTheDocument();
    expect(
      screen.getByAltText(`${mockSelectedChannel.name} 썸네일`)
    ).toBeInTheDocument();
  });

  it("isChannelChanged가 false이면 '광고 감지'를 표시한다", () => {
    mockIsChannelChanged = false;

    render(<ChannelPlayer />);

    expect(screen.getByText("광고 감지")).toBeInTheDocument();
  });

  it("isChannelChanged가 true이면 '기존 채널로 이동'을 표시한다", () => {
    mockIsChannelChanged = true;

    render(<ChannelPlayer />);

    expect(screen.getByText("기존 채널로 이동")).toBeInTheDocument();
  });

  it("토글 버튼 클릭 시 updateSetting을 호출한다", () => {
    mockIsChannelChanged = true;

    render(<ChannelPlayer />);

    const toggleButton = screen.getByTestId("toggle-button");
    fireEvent.click(toggleButton);

    expect(mockUpdateSetting).toHaveBeenCalled();
  });

  it("isPlaying이 true면 일시정지 아이콘이 표시된다", () => {
    mockIsChannelChanged = true;
    mockIsPlaying = true;

    useChannelPlayback.mockReturnValue({
      selectedChannel: mockSelectedChannel,
      isPlaying: true,
      handlePlayPause: mockHandlePlayPause,
    });

    render(<ChannelPlayer />);

    expect(screen.getByTestId("pause-icon")).toBeInTheDocument();
  });

  it("isPlaying이 false면 재생 아이콘이 표시된다", () => {
    mockIsChannelChanged = true;
    mockIsPlaying = false;

    useChannelPlayback.mockReturnValue({
      selectedChannel: mockSelectedChannel,
      isPlaying: false,
      handlePlayPause: mockHandlePlayPause,
    });

    render(<ChannelPlayer />);

    expect(screen.getByTestId("play-icon")).toBeInTheDocument();
  });

  it("재생 버튼 클릭 시 handlePlayPause를 호출한다", () => {
    mockIsChannelChanged = true;

    render(<ChannelPlayer />);

    const playButton = screen.getByTestId("play-pause-button");
    fireEvent.click(playButton);

    expect(mockHandlePlayPause).toHaveBeenCalled();
  });
});
