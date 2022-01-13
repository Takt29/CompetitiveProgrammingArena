import { useContest } from "../../hook/context/ContestContext";

export const ContestOwner = () => {
  const { createdBy } = useContest();

  return <span>{createdBy.name}</span>;
};
