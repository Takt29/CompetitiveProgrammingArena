import { doc, DocumentReference } from "firebase/firestore";
import { useMemo } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../helper/firebase";
import {
  Settings,
  FireStoreSettings,
  SettingsNamespace,
} from "../../type/settings";

export const useFetchSettings = <T extends SettingsNamespace>(
  namespaceId: T | undefined
) => {
  const settingsDoc = namespaceId
    ? (doc(db, "settings", namespaceId) as DocumentReference<
        FireStoreSettings<T>
      >)
    : null;

  const [settingsSnapshot, loading, error] = useDocument(settingsDoc);

  const settings: Settings<T> | undefined = useMemo(() => {
    if (!settingsDoc || !namespaceId) return undefined;

    const data = settingsSnapshot?.data();
    return (
      settingsSnapshot &&
      data && {
        namespaceId,
        ...data,
      }
    );
  }, [namespaceId, settingsDoc, settingsSnapshot]);

  return [settings, loading, error] as const;
};
