import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../helper/firebase";

type CreateContestParams = {
  contestId: string;
  userId: string;
};

export const createContestant = async (contestant: CreateContestParams) => {
  if (!auth.currentUser) {
    throw new Error("Not authenticated.");
  }
  const uid = auth.currentUser.uid;

  const { contestId, userId } = contestant;

  const contestantRef = doc(db, "contests", contestId, "contestants", userId);

  await setDoc(contestantRef, {
    userId,
    // TODO: 別生成する
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
  });

  return contestantRef.id;
};
