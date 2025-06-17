import { useNavigate } from "react-router-dom";

import IconWarning from "@/assets/svgs/icon-warning.svg?react";
import { NOT_FOUND_MESSAGES } from "@/shared/constants/notFoundMessages";
import { ROUTES } from "@/shared/constants/routePaths";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center">
        <IconWarning className="mt-50 h-20 w-20" />
      </div>
      <h1 className="mt-5 flex items-center justify-center text-xl font-black">
        {NOT_FOUND_MESSAGES.TITLE1}
        <span className="ml-2 text-yellow-400">
          {NOT_FOUND_MESSAGES.TITLE2}
        </span>
      </h1>
      <div className="mt-6 text-center text-sm font-medium text-neutral-500">
        <p>
          {NOT_FOUND_MESSAGES.DESCRIPTION_LINE_1}
          <br />
          {NOT_FOUND_MESSAGES.DESCRIPTION_LINE_2}
        </p>
        <p>{NOT_FOUND_MESSAGES.DESCRIPTION_LINE_3}</p>
      </div>
      <hr className="mx-auto mt-6 w-[250px] border-neutral-400" />
      <div className="mt-5 flex justify-center">
        <button
          className="flex cursor-pointer flex-col rounded-lg border-1 border-neutral-400 px-5 py-2 font-bold"
          onClick={() => navigate(ROUTES.ROOT, { replace: true })}
        >
          {NOT_FOUND_MESSAGES.BUTTON_TEXT}
        </button>
      </div>
    </>
  );
};

export default NotFound;
