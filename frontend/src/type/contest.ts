// 一時的な置き場
type Timestamp = Date;
type User = {
  id: string;
  name: string;
};

export type Contest = {
  id: string;
  name: string;
  startAt: Timestamp;
  endAt: Timestamp;
  createdBy: User;
};
