import { createBrowserRouter } from "react-router-dom";

import Home from "@/Channel/components/Home";
import ChannelPlayer from "@/Playback/components/ChannelPlayer";
import Search from "@/Search/components/Search";
import ErrorBoundaryWrapper from "@/shared/components/ErrorBoundaryWrapper";
import MainLayout from "@/shared/components/MainLayout";
import NotFound from "@/shared/components/NotFound";
import { ROUTES, RELATIVE_ROUTES } from "@/shared/constants/routePaths";
import Settings from "@/User/components/Settings";

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: (
      <ErrorBoundaryWrapper>
        <MainLayout />
      </ErrorBoundaryWrapper>
    ),
    children: [
      { path: "", element: <Home /> },
      { path: RELATIVE_ROUTES.SEARCH_RESULT, element: <Search /> },
      { path: RELATIVE_ROUTES.CHANNEL_PLAYER, element: <ChannelPlayer /> },
      { path: RELATIVE_ROUTES.SETTINGS, element: <Settings /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
