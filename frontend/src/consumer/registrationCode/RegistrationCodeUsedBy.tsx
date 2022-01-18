import { useRegistrationCode } from "../../hook/context/RegistrationCodeContext";
import { UserProvider } from "../../hook/context/UserContext";
import { useFetchUser } from "../../hook/firebase/user";
import { UserName } from "../user/UserName";

export const RegistrationCodeUsedBy = () => {
  const { usedBy } = useRegistrationCode();
  const [user] = useFetchUser(usedBy);

  if (!user) return <span>{usedBy}</span>;

  return (
    <UserProvider value={user}>
      <UserName />
    </UserProvider>
  );
};
