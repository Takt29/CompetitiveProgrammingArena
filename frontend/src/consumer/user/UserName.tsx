import { useUser } from "../../hook/context/UserContext";

export const UserName = () => {
  const { name } = useUser();

  return <span>{name}</span>;
};
