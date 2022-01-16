import { httpsCallable } from "firebase/functions";
import { functions } from "../helper/firebase";

export type TaskInformation = {
  externalTaskId: string;
  title?: string | undefined;
  score?: number | undefined;
};

export const verifyAccount = httpsCallable<{ registrationCode: string }, void>(
  functions,
  "auth-verifyAccount"
);
