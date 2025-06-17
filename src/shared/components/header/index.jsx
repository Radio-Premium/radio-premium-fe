import { useLocation } from "react-router-dom";

import MainHeader from "@/shared/components/header/MainHeader";
import RadioSearchInput from "@/shared/components/header/RadioSearchInput";
import ReportHeader from "@/shared/components/header/ReportHeader";
import { ROUTES } from "@/shared/constants/routePaths";

const Header = () => {
  const { pathname } = useLocation();

  if (pathname === ROUTES.ROOT) {
    return <MainHeader />;
  }

  if (pathname === ROUTES.SEARCH_RESULT) {
    return <RadioSearchInput />;
  }

  if (pathname === ROUTES.CHANNEL_PLAYER) {
    return <ReportHeader />;
  }

  return <MainHeader showSearchIcon={false} />;
};

export default Header;
