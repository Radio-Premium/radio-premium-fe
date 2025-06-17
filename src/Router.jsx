import { createBrowserRouter } from "react-router-dom";

import Home from "@/Channel/components/Home";
import ChannelPlayer from "@/Playback/components/ChannelPlayer";
import Search from "@/Search/components/Search";
import ErrorBoundaryWrapper from "@/shared/components/ErrorBoundaryWrapper";
import MainLayout from "@/shared/components/MainLayout";
import NotFound from "@/shared/components/NotFound";
import Settings from "@/User/components/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundaryWrapper>
        <MainLayout />
      </ErrorBoundaryWrapper>
    ),
    children: [
      { path: "", element: <Home /> },
      { path: "search-result", element: <Search /> },
      { path: "channel-player", element: <ChannelPlayer /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
