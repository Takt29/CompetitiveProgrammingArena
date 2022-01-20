import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../helper/firebase";

type CreateRegistrationCodeParams = {
  expiredAt: Timestamp;
};

export const createRegistrationCode = async (
  params: CreateRegistrationCodeParams
) => {
  if (!auth.currentUser) {
    throw new Error("Not authenticated.");
  }

  const docRef = doc(collection(db, "registrationCodes"));

  await setDoc(docRef, {
    ...params,
    // TODO: 別生成する
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: auth.currentUser.uid,
  });

  return docRef.id;
};
