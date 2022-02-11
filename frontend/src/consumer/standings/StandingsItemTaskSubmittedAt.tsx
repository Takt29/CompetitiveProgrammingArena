import { useMemo } from "react";
import { getDuration } from "../../helper/dateTime";
import { useContest } from "../../hook/context/ContestContext";
import { useStandingsItem } from "../../hook/context/StandingsItemContext";
import { TaskScore } from "../../type/standings";
import { Task } from "../../type/task";

type Props = {
  taskId: Task["id"];
};

export const StandingsItemTaskSubmittedAt = (props: Props) => {
  const { taskId } = props;
  const { startAt } = useContest();
  const { taskScores } = useStandingsItem();
  const taskScore: TaskScore | undefined = useMemo(
    () => taskScores[taskId],
    [taskId, taskScores]
  );

  const { score, submittedAt } = taskScore ?? {};

  const duration = useMemo(() => {
    if (!score || score <= 0 || !submittedAt || !startAt) {
      return <span>{"--:--"}</span>;
    }

    const minutes = getDuration(startAt, submittedAt, "minutes");
    const seconds = getDuration(startAt, submittedAt, "seconds") % 60;

    const minutesStr = minutes.toString().padStart(2, "0");
    const secondsStr = seconds.toString().padStart(2, "0");

    return `${minutesStr}:${secondsStr}`;
  }, [score, startAt, submittedAt]);

  return <span>{duration}</span>;
};
