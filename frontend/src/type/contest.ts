import { Timestamp } from "firebase/firestore";

// 一時的な置き場
type User = {
  id: string;
  name: string;
};

export type Contest = {
  id: string;
  name: string;
  description: string;
  startAt: Timestamp;
  endAt: Timestamp;
  createdBy: User;
};
