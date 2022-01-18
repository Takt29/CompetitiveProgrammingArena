import {
  collection,
  CollectionReference,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../helper/firebase";
import {
  FireStoreRegistrationCode,
  RegistrationCode,
} from "../../type/registrationCode";

export const useFetchRegistrationCodes = (queries?: QueryConstraint[]) => {
  const registrationCodeCollection = collection(
    db,
    "registrationCodes"
  ) as CollectionReference<FireStoreRegistrationCode>;

  const [registrationCodesSnapshot, loading, error] = useCollection(
    query(registrationCodeCollection, ...(queries ?? []))
  );

  const registrationCodes: RegistrationCode[] | undefined = useMemo(() => {
    return registrationCodesSnapshot?.docs?.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
  }, [registrationCodesSnapshot?.docs]);

  return [registrationCodes, loading, error] as const;
};
