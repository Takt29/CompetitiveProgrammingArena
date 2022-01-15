import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../helper/firebase";

export const useAuth = () => {
  return useAuthState(auth);
};
