import { useEffect, useState } from "react";

import { createUser } from "@/User/services/users";

const useUserId = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedId = localStorage.getItem("userId");

      if (storedId === null) {
        try {
          const userId = await createUser();
          localStorage.setItem("userId", userId);
        } catch (error) {
          console.error("fetch userId failed: ", error);
        }
      } else {
        setUserId(storedId);
      }
    };

    fetchUserId();
  }, []);

  return userId;
};

export default useUserId;
