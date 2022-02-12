import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../helper/firebase";
import { AuditFields } from "../type/auditField";
import { FireStoreSettings, SettingsNamespace } from "../type/settings";

type UpdateSettingsParams<T extends SettingsNamespace> = Omit<
  FireStoreSettings<T>,
  keyof AuditFields
>;

export const createSettings = async <T extends SettingsNamespace>(
  namespaceId: T,
  params: UpdateSettingsParams<T>
) => {
  if (!auth.currentUser) {
    throw new Error("Not authenticated.");
  }

  const docRef = doc(db, "settings", namespaceId);

  await setDoc(docRef, {
    ...params,
    // TODO: 別生成する
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: auth.currentUser.uid,
  });

  return docRef.id;
};

export const updateSettings = async <T extends SettingsNamespace>(
  namespaceId: T,
  params: UpdateSettingsParams<T>
) => {
  if (!auth.currentUser) {
    throw new Error("Not authenticated.");
  }

  const docRef = doc(db, "settings", namespaceId);

  await updateDoc(docRef, {
    ...params,
    // TODO: 別生成する
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};
