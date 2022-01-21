import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../helper/firebase";
import { Contest } from "../type/contest";

type CreateContestParams = {
  name: string;
  description: string;
  startAt: Date;
  endAt: Date;
  rule: Contest["rule"];
};

type CreateTaskParams = {
  name: string;
  externalTaskId: string;
  score: number;
  originalScore: number;
};

export const createContest = async (
  contest: CreateContestParams,
  tasks?: CreateTaskParams[]
) => {
  if (!auth.currentUser) {
    throw new Error("Not authenticated.");
  }
  const uid = auth.currentUser.uid;

  const batch = writeBatch(db);

  const contestRef = doc(collection(db, "contests"));

  batch.set(contestRef, {
    ...contest,
    // TODO: 別生成する
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
  });

  (tasks ?? []).forEach((task, index) => {
    const taskRef = doc(collection(db, "tasks"));
    batch.set(taskRef, {
      ...task,
      index: index + 1,
      contestId: contestRef.id,
      // TODO: 別生成する
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: uid,
    });
    return taskRef.id;
  });

  await batch.commit();

  return { contestId: contestRef.id };
};
