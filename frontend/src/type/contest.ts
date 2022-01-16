import { Timestamp } from "firebase/firestore";
import { StandingsSystemType } from "../constant/StandingsSystem";
import { AuditFields } from "./auditField";

export type FireStoreContest = {
  name: string;
  description: string;
  startAt: Timestamp;
  endAt: Timestamp;
  rule: {
    system: StandingsSystemType;
    penaltyMins: number;
  };
} & AuditFields;

export type Contest = FireStoreContest & {
  id: string;
};
