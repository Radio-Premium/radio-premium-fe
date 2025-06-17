import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BackArrow from "@/assets/svgs/icon-back-arrow.svg?react";
import SearchThinIcon from "@/assets/svgs/icon-search-thin.svg?react";
import { useSearchStore } from "@/Search/stores/useSearchStore";
import Button from "@/shared/components/ui/Button";
import { SEARCH_HEADER_MESSAGES } from "@/shared/constants/headerMessages";

const RadioSearchInput = () => {
  const navigate = useNavigate();
  const keyword = useSearchStore((state) => state.keyword);
  const setKeyword = useSearchStore((state) => state.setKeyword);
  const [isInputClicked, setIsInputClicked] = useState(false);

  return (
    <div className="flex w-full justify-center pt-10">
      <div className="flex w-full max-w-md items-center gap-2 px-4">
        <Button className="mr-4 cursor-pointer" onClick={() => navigate(-1)}>
          <BackArrow />
        </Button>
        <div className="flex h-11 flex-1 items-center rounded-4xl bg-neutral-200 px-4">
          <SearchThinIcon className="mr-2" />
          <input
            value={keyword}
            onFocus={() => setIsInputClicked(true)}
            onBlur={() => setIsInputClicked(false)}
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            placeholder={!isInputClicked && SEARCH_HEADER_MESSAGES.PLACEHOLDER}
            className="w-full text-sm font-semibold text-neutral-800 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default RadioSearchInput;
