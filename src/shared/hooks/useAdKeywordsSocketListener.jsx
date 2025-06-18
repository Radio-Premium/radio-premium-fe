import { useCallback, useEffect } from "react";

import useChannelSwitch from "@/Channel/hooks/useChannelSwitch";
import socket from "@/shared/utils/socketClient";
import useUserId from "@/User/hooks/useUserId";

const useAdKeywordsSocketListener = () => {
  const handleChannelSwitch = useChannelSwitch();
  const userId = Number(useUserId());

  const handleConnect = useCallback(() => {
    console.log("connected");
    socket.emit("registerUser", { userId: String(userId) });
  }, [userId]);

  const handleRadioText = useCallback(
    ({ isAd }) => {
      handleChannelSwitch(isAd);
    },
    [handleChannelSwitch]
  );

  const handleDisconnect = useCallback(() => {
    console.log("disconnected");
  }, []);

  useEffect(() => {
    if (Number.isNaN(userId)) {
      return;
    }

    if (socket.connected) {
      handleConnect();
    }

    socket.on("connect", handleConnect);
    socket.on("radioText", handleRadioText);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("radioText", handleRadioText);
      socket.off("disconnect", handleDisconnect);
    };
  }, [handleConnect, handleRadioText, handleDisconnect, userId]);
};

export default useAdKeywordsSocketListener;
