import { DummyUsers } from "../../dummy/user";
import { useAuth } from "./auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../helper/firebase";
import { doc, DocumentReference } from "firebase/firestore";
import { useMemo } from "react";
import { FireStoreUser, User } from "../../type/user";

export const useFetchUser = (userId: string) => {
  return DummyUsers.find(({ id }) => id === userId);
};

export const useFetchUsers = () => {
  return DummyUsers;
};

export const useFetchCurrentUser = () => {
  const [auth] = useAuth();

  const userDoc = auth
    ? (doc(db, "users", auth.uid) as DocumentReference<FireStoreUser>)
    : null;

  const [userDocSnapshot, loading, error] = useDocument(userDoc);

  const user: User | undefined = useMemo(() => {
    const data = userDocSnapshot?.data();
    return (
      userDocSnapshot &&
      data && {
        id: userDocSnapshot.id,
        ...data,
      }
    );
  }, [userDocSnapshot]);

  return [user, loading, error] as const;
};
