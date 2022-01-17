import { AuditFields } from "./auditField";

export type FireStoreContestant = {
  teamId?: string;
} & AuditFields;

export type Contestant = FireStoreContestant & {
  userId: string;
  contestId: string;
};
