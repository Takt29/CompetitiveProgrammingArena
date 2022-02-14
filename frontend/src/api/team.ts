import { AuditFields } from "../type/auditField";
import { User } from "../type/user";

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
