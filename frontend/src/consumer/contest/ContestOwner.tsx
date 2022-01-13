import { useContest } from "../../hook/context/ContestContext";

export const ContestOwner = () => {
  const { owner } = useContest();

  return <span>{owner.name}</span>;
};
