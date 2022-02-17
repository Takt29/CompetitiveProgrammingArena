import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useMemo } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../helper/firebase";
import {
  Team,
  FireStoreTeam,
  FireStoreTeamMember,
  TeamMember,
} from "../../type/team";

export const useFetchTeam = (teamId: string | undefined) => {
  const teamDoc = teamId
    ? (doc(db, "teams", teamId) as DocumentReference<FireStoreTeam>)
    : null;

  const [teamSnapshot, loading, error] = useDocument(teamDoc);

  const team: Team | undefined = useMemo(() => {
    if (!teamDoc) return undefined;

    const data = teamSnapshot?.data();
    return (
      teamSnapshot &&
      data && {
        id: teamDoc.id,
        ...data,
      }
    );
  }, [teamDoc, teamSnapshot]);

  return [team, loading, error] as const;
};

export const useFetchTeams = (queries?: QueryConstraint[]) => {
  const teamCollection = collection(
    db,
    "teams"
  ) as CollectionReference<FireStoreTeam>;

  const [teamsSnapshot, loading, error] = useCollection(
    query(teamCollection, ...(queries ?? []))
  );

  const teams: Team[] | undefined = useMemo(() => {
    return teamsSnapshot?.docs?.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
  }, [teamsSnapshot?.docs]);

  return [teams, loading, error] as const;
};

export const useFetchTeamMembers = (queries?: QueryConstraint[]) => {
  const teamMemberCollection = collection(
    db,
    "teamMembers"
  ) as CollectionReference<FireStoreTeamMember>;

  const [teamMembersSnapshot, loading, error] = useCollection(
    query(teamMemberCollection, ...(queries ?? []))
  );

  const teamMembers: TeamMember[] | undefined = useMemo(() => {
    return teamMembersSnapshot?.docs?.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
  }, [teamMembersSnapshot?.docs]);

  return [teamMembers, loading, error] as const;
};
