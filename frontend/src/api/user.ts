import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../helper/firebase";
import { User } from "../type/user";

type UpdateUserParams = {
  name: string;
  externalAccountId: User["externalAccountId"];
};

export const createUser = async (uid: string, params: UpdateUserParams) => {
  if (!auth.currentUser) {
    throw new Error("Not authenticated.");
  }

  return await setDoc(doc(db, "users", uid), {
    ...params,
    // TODO: 別生成する
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: auth.currentUser.uid,
  });
};

export const updateUser = async (uid: string, params: UpdateUserParams) => {
  if (!auth.currentUser) {
    throw new Error("Not authenticated.");
  }

  return await setDoc(
    doc(db, "users", uid),
    {
      ...params,
      // TODO: 別生成する
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};
