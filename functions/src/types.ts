import { firestore } from "firebase-admin";

export type DocumentSnapshot<T> = firestore.DocumentSnapshot<T>;
export type Timestamp = firestore.Timestamp;
export type TimestampOrServerTimestamp =
  | firestore.Timestamp
  | firestore.FieldValue;

export type AuditFields = {
  createdAt: TimestampOrServerTimestamp;
  updatedAt: TimestampOrServerTimestamp;
  createdBy: string;
};

export type Submission = {
  contestId: string;
  taskId: string;
  status: string; // TODO: enum
  score: number;
  language: string;
  submittedAt: Timestamp;
  submittedBy: string;
  externalSubmissionId: string; // [site]:[contest]:[id]
} & AuditFields;

export type StandingsSystemType =
  | "atcoder"
  | "icpc"
  | "icpc_domestic"
  | "joi"
  | "pck"
  | "codeforces"
  | "lockout";

export type Contest = {
  name: string;
  description: string;
  startAt: Timestamp;
  endAt: Timestamp;
  rule: {
    system: StandingsSystemType;
    penaltyMins: number;
  };
} & AuditFields;

export type Task = {
  contestId: string;
  index: number;
  name: string;
  externalTaskId: string; // [site]:[contestId]:[problemId]
  score: number;
  originalScore: number;
} & AuditFields;

export type StandingsScore = {
  score: number;
  penalty: number;
  submittedAt: Timestamp | null;
};

export type TaskScore = {
  externalScore: number;
  score: number;
  penalty: number;
  submittedAt: Timestamp | null;
  numOfSubmissions: number;
};

export type StandingsItem = {
  contestId: string;
  taskScores: { [taskId: string]: TaskScore };
  score: StandingsScore;
  sortKey: number[];
} & AuditFields;

/* User */

export type User = {
  name: string;
  externalAccountId: {
    atcoder?: string;
    codeforces?: string;
    aoj?: string;
  };
} & AuditFields;

/* Settings */

export type SettingsNamespace = "general" | "notification";

export type GeneralSettings = {
  domain: string;
} & AuditFields;

export type NotificationSettings = {
  slackToken: string;
  discordWebhookUrl: string;
} & AuditFields;
