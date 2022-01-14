import { createContext, useContext } from "react";
import { Submission } from "../../type/submission";

const SubmissionContext = createContext<Submission | null>(null);

export const SubmissionProvider = SubmissionContext.Provider;

export const useSubmission = (): Submission => {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error("useSubmission must be used inside SubmissionProvider.");
  }
  return context;
};
