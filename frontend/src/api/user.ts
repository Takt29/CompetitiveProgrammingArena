import {
  collection,
  doc,
  endAt,
  getDocs,
  orderBy,
  query,
  QueryConstraint,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  startAt,
} from "firebase/firestore";
import { auth, db } from "../helper/firebase";
import { User, FireStoreUser } from "../type/user";

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

export const searchUser = async (name: string, queries?: QueryConstraint[]) => {
  const snapshots = (await getDocs(
    query(
      collection(db, "users"),
      orderBy("name"),
      startAt(name),
      endAt(name + "\uf8ff"),
      ...(queries ?? [])
    )
  )) as QuerySnapshot<FireStoreUser>;

  const users = snapshots.docs.map(
    (doc): User => ({
      id: doc.id,
      ...doc.data(),
    })
  );

  return users;
};
