import useInterestChannels from "@/Channel/hooks/useInterestChannels";
import useUserId from "@/User/hooks/useUserId";
import useUserProfile from "@/User/hooks/useUserProfile";

const useUserData = () => {
  const userId = useUserId();

  useInterestChannels(userId);
  useUserProfile(userId);
};

export default useUserData;
