import { useNavigate } from "react-router-dom";

import RadioPremiumLogo from "@/assets/svgs/icon-radio-premium-logo.svg?react";
import SearchBoldIcon from "@/assets/svgs/icon-search-bold.svg?react";
import { ROUTES } from "@/shared/constants/routePaths";

const MainHeader = ({ showSearchIcon = true }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.SEARCH_RESULT);
  };

  return (
    <div className="flex items-center justify-between pt-6 pb-3 pl-5">
      <div className="flex items-center">
        <button
          className="cursor-pointer"
          onClick={() => navigate(ROUTES.ROOT)}
        >
          <RadioPremiumLogo />
        </button>
      </div>
      {showSearchIcon && (
        <SearchBoldIcon
          className="mt-1 mr-4 cursor-pointer"
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default MainHeader;
