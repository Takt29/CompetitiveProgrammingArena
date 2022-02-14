import { useTeam } from "../../hook/context/TeamContext";

export const TeamName = () => {
  const { name } = useTeam();

  return <span>{name}</span>;
};
