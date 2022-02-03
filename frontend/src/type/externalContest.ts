import { AuditFields } from "./auditField";

export type FireStoreExternalContest = {
  loadedExternalSubmissionId: number;
} & AuditFields;

export type ExternalContest = FireStoreExternalContest & {
  externalContestId: string;
};
