import { useEffect, useState } from "react";

import { handleAsyncError } from "@/shared/utils/handleAsyncError";
import { createUser } from "@/User/services/users";

const useUserId = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = () => {
      const storedId = localStorage.getItem("userId");

      if (storedId === null) {
        return handleAsyncError(async () => {
          const userId = await createUser();
          localStorage.setItem("userId", userId);
        }, "Failed to create user:");
      } else {
        setUserId(storedId);
      }
    };

    fetchUserId();
  }, []);

  return userId;
};

export default useUserId;
