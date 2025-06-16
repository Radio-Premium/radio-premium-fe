import { useEffect, useRef } from "react";

import isAdTimeNow from "@/Playback/utils/adTimeChecker";

const useAdTimeDetector = (handleChannelSwitch) => {
  const isAdTimeAlreadyHandled = useRef(false);

  useEffect(() => {
    const checkAdTime = () => {
      const now = new Date();
      const isAdTime = isAdTimeNow(now.getMinutes(), now.getSeconds());

      if (isAdTime && !isAdTimeAlreadyHandled.current) {
        isAdTimeAlreadyHandled.current = true;
        handleChannelSwitch(true);
      }

      if (!isAdTime && isAdTimeAlreadyHandled.current) {
        isAdTimeAlreadyHandled.current = false;
        handleChannelSwitch(false);
      }
    };

    const timer = setInterval(checkAdTime, 10000);

    return () => clearInterval(timer);
  }, [handleChannelSwitch]);
};

export default useAdTimeDetector;
