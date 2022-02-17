import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../helper/firebase";

type CreateTeamParams = {
  name: string;
  description: string;
};

type CreateMemberParams = {
  userId: string;
};

export const createTeam = async (
  team: CreateTeamParams,
  members?: CreateMemberParams[]
) => {
  if (!auth.currentUser) {
    throw new Error("Not authenticated.");
  }
  const uid = auth.currentUser.uid;

  const batch = writeBatch(db);

  const teamRef = doc(collection(db, "teams"));

  batch.set(teamRef, {
    ...team,
    // TODO: 別生成する
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
  });

  (members ?? []).forEach((member) => {
    const memberRef = doc(collection(db, "teamMembers"));
    batch.set(memberRef, {
      ...member,
      teamId: teamRef.id,
      // TODO: 別生成する
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: uid,
    });
    return teamRef.id;
  });

  await batch.commit();

  return { teamId: teamRef.id };
};
