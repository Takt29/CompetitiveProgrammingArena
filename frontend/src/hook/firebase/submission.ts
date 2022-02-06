import {
  collection,
  CollectionReference,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../helper/firebase";
import { FireStoreSubmission, Submission } from "../../type/submission";

export const useFetchSubmissions = (queries?: QueryConstraint[]) => {
  const submissionCollection = collection(
    db,
    "submissions"
  ) as CollectionReference<FireStoreSubmission>;

  const [submissionsSnapshot, loading, error] = useCollection(
    query(submissionCollection, ...(queries ?? []))
  );

  const submissions: Submission[] | undefined = useMemo(() => {
    return submissionsSnapshot?.docs?.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
  }, [submissionsSnapshot?.docs]);

  return [submissions, loading, error] as const;
};
