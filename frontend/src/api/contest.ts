import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../helper/firebase";

type CreateContestParams = {
  name: string;
  description: string;
  startAt: Date;
  endAt: Date;
};

export const createContest = async (params: CreateContestParams) => {
  const { name, description, startAt, endAt } = params;

  if (!auth.currentUser) {
    throw new Error("Not authenticated.");
  }

  return await addDoc(collection(db, "contests"), {
    name,
    description,
    startAt: Timestamp.fromDate(startAt),
    endAt: Timestamp.fromDate(endAt),
    // TODO: 別生成する
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: auth.currentUser.uid,
  });
};
