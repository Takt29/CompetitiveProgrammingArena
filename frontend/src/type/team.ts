import { AuditFields } from "./auditField";
import { User } from "./user";

export type FireStoreTeam = {
  name: string;
} & AuditFields;

export type Team = {
  id: string;
} & FireStoreTeam;

export type FireStoreTeamMember = {
  teamId: Team["id"];
  userId: User["id"];
} & AuditFields;

export type TeamMember = {
  id: string;
} & FireStoreTeamMember;
