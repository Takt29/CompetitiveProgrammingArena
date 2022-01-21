import { doc, DocumentReference } from "firebase/firestore";
import { useMemo } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../helper/firebase";
import { Contestant, FireStoreContestant } from "../../type/contestant";

export const useFetchContestant = (
  contestId: string | undefined,
  userId: string | undefined
) => {
  const contestantDoc =
    contestId && userId
      ? (doc(
          db,
          "contests",
          contestId,
          "contestants",
          userId
        ) as DocumentReference<FireStoreContestant>)
      : null;

  const [contestSnapshot, loading, error] = useDocument(contestantDoc);

  const contestant: Contestant | undefined = useMemo(() => {
    if (!contestantDoc || !contestId) return undefined;

    const data = contestSnapshot?.data();
    return (
      contestSnapshot &&
      data && {
        userId: contestantDoc.id,
        contestId,
        ...data,
      }
    );
  }, [contestantDoc, contestId, contestSnapshot]);

  return [contestant, loading, error] as const;
};
