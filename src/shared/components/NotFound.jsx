import { useNavigate } from "react-router-dom";

import IconWarning from "@/assets/svgs/icon-warning.svg?react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center">
        <IconWarning className="mt-50 h-20 w-20" />
      </div>
      <h1 className="mt-5 flex items-center justify-center text-xl font-black">
        페이지를 <span className="ml-2 text-yellow-400"> 찾을 수 없습니다</span>
      </h1>
      <div className="mt-6 text-center text-sm font-medium text-neutral-500">
        <p>
          요청하신 페이지가 제거되었거나,
          <br />
          일시적으로 사용이 중단되었습니다.
        </p>
        <p>이용에 불편을 드려 죄송합니다.</p>
      </div>
      <hr className="mx-auto mt-6 w-[250px] border-neutral-400" />
      <div className="mt-5 flex justify-center">
        <button
          className="flex cursor-pointer flex-col rounded-lg border-1 border-neutral-400 px-5 py-2 font-bold"
          onClick={() => navigate("/", { replace: true })}
        >
          홈으로 이동
        </button>
      </div>
    </>
  );
};

export default NotFound;
