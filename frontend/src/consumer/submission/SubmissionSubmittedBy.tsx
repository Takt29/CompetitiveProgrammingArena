import { useSubmission } from "../../hook/context/SubmissionContext";
import { UserProvider } from "../../hook/context/UserContext";
import { useFetchUser } from "../../hook/firebase/user";
import { UserName } from "../user/UserName";

export const SubmissionSubmittedBy = () => {
  const { submittedBy } = useSubmission();
  const [user] = useFetchUser(submittedBy);

  if (!user) return null;

  return (
    <UserProvider value={user}>
      <UserName />
    </UserProvider>
  );
};
