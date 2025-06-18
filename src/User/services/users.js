import axiosInstance from "@/shared/services/axiosInstance";

export const createUser = async () => {
  const { data } = await axiosInstance.post("/users");

  return data.userId;
};

export const getUserInfo = async (userId) => {
  const { data } = await axiosInstance.get(`/users/${userId}`);

  return data;
};
