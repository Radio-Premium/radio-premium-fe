import { createBrowserRouter } from "react-router-dom";

import Home from "@/Channel/components/Home";
import ChannelPlayer from "@/Playback/components/ChannelPlayer";
import Search from "@/Search/components/Search";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import ErrorFallback from "@/shared/components/ErrorFallback";
import MainLayout from "@/shared/components/MainLayout";
import NotFound from "@/shared/components/NotFound";
import Settings from "@/User/components/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary
        fallback={ErrorFallback}
        onReset={() => (window.location.href = "/")}
      >
        <MainLayout />
      </ErrorBoundary>
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
