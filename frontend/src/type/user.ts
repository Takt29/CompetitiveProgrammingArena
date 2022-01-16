import { AuditFields } from "./auditField";

export type FireStoreUser = {
  name: string;
  externalAccountId: {
    atcoder?: string;
    codeforces?: string;
    aoj?: string;
  };
} & AuditFields;

export type User = FireStoreUser & {
  id: string;
};
