import { useAuth } from "./auth";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../helper/firebase";
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useMemo } from "react";
import { FireStoreUser, User } from "../../type/user";

export const useFetchUser = (userId: string | undefined) => {
  const userDoc = userId
    ? (doc(db, "users", userId) as DocumentReference<FireStoreUser>)
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

export const useFetchUsers = (queries?: QueryConstraint[]) => {
  const userCollection = collection(
    db,
    "users"
  ) as CollectionReference<FireStoreUser>;

  const [usersSnapshot, loading, error] = useCollection(
    query(userCollection, ...(queries ?? []))
  );

  const users: User[] | undefined = useMemo(() => {
    return usersSnapshot?.docs?.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
  }, [usersSnapshot?.docs]);

  return [users, loading, error] as const;
};

export const useFetchCurrentUser = (options?: { disable: boolean }) => {
  const [auth] = useAuth();
  return useFetchUser(options?.disable ? undefined : auth?.uid);
};
