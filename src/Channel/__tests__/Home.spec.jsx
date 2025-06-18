import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, beforeEach, vi } from "vitest";

import Home from "@/Channel/components/Home";
import useCategorizeChannels from "@/Channel/hooks/useCategorizeChannels";

vi.mock("axios");

vi.mock("@/Channel/hooks/useChannels", () => ({
  default: vi.fn(),
}));

vi.mock("@/Channel/hooks/useCategorizeChannels", () => {
  const mockedCategorize = vi.fn();
  return {
    default: mockedCategorize,
    __esModule: true,
  };
});

vi.mock("@/User/hooks/useUserData", () => ({
  default: vi.fn(),
}));

vi.mock("@/User/hooks/useUserId", () => ({
  default: vi.fn(),
}));

vi.mock("@/Channel/hooks/useChannelNavigation", () => ({
  default: () => mockNavigate,
}));

vi.mock("@/Channel/hooks/useToggleFavorite", () => ({
  default: () => mockToggleFavorite,
}));

const mockNavigate = vi.fn();
const mockToggleFavorite = vi.fn();

describe("Home 컴포넌트 통합 테스트", async () => {
  const renderHome = () =>
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
    axios.get = vi.fn();
    vi.mocked(useCategorizeChannels).mockReturnValue([[], []]);
  });

  test("라디오 목록의 채널을 클릭하면 해당 라디오 채널로 이동한다", async () => {
    const mockChannelData = [
      { id: 1, name: "KBS Radio", logoUrl: "kbs.jpg" },
      { id: 2, name: "MBC Radio", logoUrl: "mbc.jpg" },
    ];
    vi.mocked(useCategorizeChannels).mockReturnValue([[], mockChannelData]);

    renderHome();

    const radioChannel = screen.getByText("KBS Radio");
    fireEvent.click(radioChannel);

    expect(mockNavigate).toHaveBeenCalledWith(1);
  });

  test("일반 채널 목록의 즐겨찾기 등록 버튼을 누르면 toggleFavorite 함수를 호출한다", async () => {
    const mockFavoriteChannels = [
      { id: 1, name: "Channel 1", logoUrl: "ch1.jpg" },
      { id: 2, name: "Channel 2", logoUrl: "ch2.jpg" },
    ];
    const mockChannelData = [{ id: 1, name: "KBS Radio", logoUrl: "kbs.jpg" }];
    vi.mocked(useCategorizeChannels).mockReturnValue([
      mockFavoriteChannels,
      mockChannelData,
    ]);
    mockToggleFavorite.mockResolvedValue(true);

    renderHome();

    const favoriteButton = screen.getByTestId(
      "register-favorite-channel-button"
    );
    fireEvent.click(favoriteButton);

    await waitFor(() => {
      expect(mockToggleFavorite).toHaveBeenCalledWith(1);
    });
  });

  test("즐겨찾기 채널 목록의 즐겨찾기 삭제 버튼을 누르면 toggleFavorite 함수를 호출한다", async () => {
    const mockFavoriteChannels = [
      { id: 1, name: "Favorite Channel", logoUrl: "fav.jpg" },
    ];
    vi.mocked(useCategorizeChannels).mockReturnValue([
      mockFavoriteChannels,
      [],
    ]);
    mockToggleFavorite.mockResolvedValue(false);

    renderHome();

    const favoriteButton = screen.getByTestId("cancel-favorite-channel-button");
    fireEvent.click(favoriteButton);

    await waitFor(() => {
      expect(mockToggleFavorite).toHaveBeenCalledWith(1);
    });
  });

  test("컴포넌트가 마운트되면 라디오 채널 데이터를 불러와 화면에 표시한다", async () => {
    const mockChannelData = [
      { id: 1, name: "Test Radio", logoUrl: "test.jpg" },
    ];
    vi.mocked(axios.get).mockResolvedValue({ data: mockChannelData });
    vi.mocked(useCategorizeChannels).mockReturnValue([[], mockChannelData]);

    renderHome();

    await waitFor(() => {
      expect(screen.getByText("Test Radio")).toBeInTheDocument();
    });
  });
});
