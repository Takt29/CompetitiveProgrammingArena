import { useContest } from "../../hook/context/ContestContext";
import { UserProvider } from "../../hook/context/UserContext";
import { useFetchUser } from "../../hook/firebase/user";
import { UserName } from "../user/UserName";

export const ContestOwner = () => {
  const { createdBy } = useContest();
  const [owner] = useFetchUser(createdBy ?? "");

  if (!owner) return null;

  return (
    <UserProvider value={owner}>
      <UserName />
    </UserProvider>
  );
};
