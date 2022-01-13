import { useTask } from "../../hook/context/TaskContext";

const SiteNames: Record<string, string> = {
  atcoder: "AtCoder",
  aoj: "AOJ",
  codeforces: "Codeforces",
};

export const TaskSite = () => {
  const { externalTaskId } = useTask();

  const siteId = externalTaskId.split(":")[0];

  return <span>{SiteNames[siteId]}</span>;
};
