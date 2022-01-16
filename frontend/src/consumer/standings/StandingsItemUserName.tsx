import { useStandingsItem } from "../../hook/context/StandingsItemContext";
import { UserProvider } from "../../hook/context/UserContext";
import { useFetchUser } from "../../hook/firebase/user";
import { UserName } from "../user/UserName";

export const StandingsItemUserName = () => {
  const { userId } = useStandingsItem();
  const [user] = useFetchUser(userId);

  if (!user) return null;

  return (
    <UserProvider value={user}>
      <UserName />
    </UserProvider>
  );
};
