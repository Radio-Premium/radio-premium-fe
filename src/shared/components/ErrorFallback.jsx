import WarningIcon from "@/assets/svgs/icon-warning-red.svg?react";

const ErrorFallback = ({ resetError }) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <WarningIcon className="mt-50" />
      </div>
      <h1 className="mt-5 flex items-center justify-center text-xl">
        데이터를 불러오는 중에 오류가 발생했습니다.
      </h1>
      <div className="mt-6 text-center text-sm font-medium text-neutral-500">
        <p>이용에 불편을 드려 죄송합니다.</p>
      </div>
      <hr className="mx-auto mt-6 w-[250px] border-neutral-400" />
      <div className="mt-5 flex justify-center">
        <button
          className="flex cursor-pointer flex-col rounded-lg border-1 border-neutral-400 px-5 py-2 font-bold"
          onClick={resetError}
        >
          홈으로 이동
        </button>
      </div>
    </>
  );
};

export default ErrorFallback;
