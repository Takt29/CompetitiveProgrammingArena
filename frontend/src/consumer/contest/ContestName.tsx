import { useContest } from "../../hook/context/ContestContext";

export const ContestName = () => {
  const { name } = useContest();

  return <span>{name}</span>;
};
