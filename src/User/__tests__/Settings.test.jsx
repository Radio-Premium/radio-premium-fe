import {
  renderHook,
  act,
  render,
  screen,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import { useChannelStore } from "@/Channel/stores/useChannelStore";
import Settings from "@/User/components/Settings";
import { SETTING_TYPES } from "@/User/constants/settingOptions";
import useUpdateSetting from "@/User/hooks/useUpdateSetting";
import { useUserStore } from "@/User/stores/useUserStore";

vi.mock("axios");

describe("UserSetting", () => {
  it("광고 감지 설정이 false일 경우, useUpdateSetting을 호출하면 설정을 true로 변경한다", async () => {
    useUserStore.setState({ settings: { isAdDetect: false } });
    vi.spyOn(window.localStorage.__proto__, "getItem").mockReturnValue("1");
    axios.patch.mockResolvedValue({});

    const { result } = renderHook(() =>
      useUpdateSetting(SETTING_TYPES.AD_DETECT)
    );

    await act(async () => {
      await result.current();
    });

    expect(useUserStore.getState().settings.isAdDetect).toBe(true);
  });

  it("이전 채널 설정이 false일 경우, useUpdateSetting을 호출하면 설정을 true로 변경한다", async () => {
    useUserStore.setState({ settings: { isReturnChannel: false } });
    vi.spyOn(window.localStorage.__proto__, "getItem").mockReturnValue("1");
    axios.patch.mockResolvedValue({});

    const { result } = renderHook(() =>
      useUpdateSetting(SETTING_TYPES.RETURN_CHANNEL)
    );

    await act(async () => {
      await result.current();
    });

    expect(useUserStore.getState().settings.isReturnChannel).toBe(true);
  });

  it("광고 감지가 true일 때 광고 없는 채널 선택 UI를 표시한다", () => {
    useUserStore.setState({ settings: { isAdDetect: true } });

    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    expect(screen.getByTestId("no-ad-channel-list")).toBeInTheDocument();
  });

  it("광고 감지가 false일 때 광고 없는 채널 선택 UI를 표시하지 않는다", () => {
    useUserStore.setState({ settings: { isAdDetect: false } });

    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("no-ad-channel-list")).not.toBeInTheDocument();
  });

  it("광고 없는 채널 중 하나만 선택된 상태로 표시한다", () => {
    useUserStore.setState({
      settings: {
        isAdDetect: true,
        adRedirectChannelId: 2,
      },
    });

    useChannelStore.setState({
      radioChannelList: [
        { id: 1, name: "채널 1", logoUrl: "dummy", isAdChannel: false },
        { id: 2, name: "채널 2", logoUrl: "dummy", isAdChannel: false },
      ],
    });

    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    const list = screen.getByTestId("no-ad-channel-list");
    const items = within(list).getAllByRole("listitem");

    expect(
      within(items[0]).queryByTestId("selected-no-ad-channel")
    ).not.toBeInTheDocument();

    expect(
      within(items[1]).getByTestId("selected-no-ad-channel")
    ).toBeInTheDocument();
  });
});
