import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useMemo } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../helper/firebase";
import { Contest, FireStoreContest } from "../../type/contest";

export const useFetchContest = (contestId: string) => {
  const contestDoc = doc(
    db,
    "contests",
    contestId
  ) as DocumentReference<FireStoreContest>;

  const [contestSnapshot, loading, error] = useDocument(contestDoc);

  const contest: Contest | undefined = useMemo(() => {
    const data = contestSnapshot?.data();
    return (
      contestSnapshot &&
      data && {
        id: contestDoc.id,
        ...data,
      }
    );
  }, [contestDoc.id, contestSnapshot]);

  return [contest, loading, error] as const;
};

export const useFetchContests = (queries?: QueryConstraint[]) => {
  const contestCollection = collection(
    db,
    "contests"
  ) as CollectionReference<FireStoreContest>;

  const [contestsSnapshot, loading, error] = useCollection(
    query(contestCollection, ...(queries ?? []))
  );

  const contests: Contest[] | undefined = useMemo(() => {
    return contestsSnapshot?.docs?.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
  }, [contestsSnapshot?.docs]);

  return [contests, loading, error] as const;
};
