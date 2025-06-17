import WarningIcon from "@/assets/svgs/icon-warning-red.svg?react";
import { ERROR_FALLBACK_MESSAGES } from "@/shared/constants/errorFallbackMessages";

const ErrorFallback = ({ resetError }) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <WarningIcon className="mt-50" />
      </div>
      <h1 className="mt-5 flex items-center justify-center text-xl">
        {ERROR_FALLBACK_MESSAGES.TITLE}
      </h1>
      <div className="mt-6 text-center text-sm font-medium text-neutral-500">
        <p>{ERROR_FALLBACK_MESSAGES.DESCRIPTION}</p>
      </div>
      <hr className="mx-auto mt-6 w-[250px] border-neutral-400" />
      <div className="mt-5 flex justify-center">
        <button
          className="flex cursor-pointer flex-col rounded-lg border-1 border-neutral-400 px-5 py-2 font-bold"
          onClick={resetError}
        >
          {ERROR_FALLBACK_MESSAGES.BUTTON_TEXT}
        </button>
      </div>
    </>
  );
};

export default ErrorFallback;
