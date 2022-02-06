import {
  collection,
  CollectionReference,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../helper/firebase";
import { Contest } from "../../type/contest";
import { FireStoreStandingsItem, StandingsItem } from "../../type/standings";

export const useFetchStandings = (
  contestId: Contest["id"] | undefined,
  queries?: QueryConstraint[]
) => {
  const standingsCollection = contestId
    ? (collection(
        db,
        "contests",
        contestId,
        "standings"
      ) as CollectionReference<FireStoreStandingsItem>)
    : null;

  const [standingsSnapshot, loading, error] = useCollection(
    standingsCollection ? query(standingsCollection, ...(queries ?? [])) : null
  );

  const standings: StandingsItem[] | undefined = useMemo(() => {
    return standingsSnapshot?.docs?.map((doc) => {
      const data = doc.data();
      return {
        userId: doc.id,
        ...data,
      };
    });
  }, [standingsSnapshot?.docs]);

  return [standings, loading, error] as const;
};
