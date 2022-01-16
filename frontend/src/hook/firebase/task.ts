import {
  collection,
  CollectionReference,
  query,
  doc,
  DocumentReference,
  QueryConstraint,
} from "firebase/firestore";
import { useMemo } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../helper/firebase";
import { FireStoreTask, Task } from "../../type/task";

export const useFetchTasks = (queries?: QueryConstraint[]) => {
  const taskCollection = collection(
    db,
    "tasks"
  ) as CollectionReference<FireStoreTask>;

  const [tasksSnapshot, loading, error] = useCollection(
    query(taskCollection, ...(queries ?? []))
  );

  const tasks: Task[] | undefined = useMemo(() => {
    return tasksSnapshot?.docs?.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
  }, [tasksSnapshot?.docs]);

  return [tasks, loading, error] as const;
};

export const useFetchTask = (taskId: string) => {
  const taskDoc = doc(db, "tasks", taskId) as DocumentReference<FireStoreTask>;

  const [taskSnapshot, loading, error] = useDocument(taskDoc);

  const task: Task | undefined = useMemo(() => {
    const data = taskSnapshot?.data();
    return (
      taskSnapshot &&
      data && {
        id: taskDoc.id,
        ...data,
      }
    );
  }, [taskDoc.id, taskSnapshot]);

  return [task, loading, error] as const;
};
