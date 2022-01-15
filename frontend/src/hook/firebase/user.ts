import { DummyUsers } from "../../dummy/user";

export const useFetchUser = (userId: string) => {
  return DummyUsers.find(({ id }) => id === userId);
};

export const useFetchUsers = () => {
  return DummyUsers;
};
