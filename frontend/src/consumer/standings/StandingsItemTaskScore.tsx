import { useMemo } from "react";
import { useStandingsItem } from "../../hook/context/StandingsItemContext";
import { TaskScore } from "../../type/standings";
import { Task } from "../../type/task";

type Props = {
  taskId: Task["id"];
};

export const StandingsItemTaskScore = (props: Props) => {
  const { taskId } = props;
  const { taskScores } = useStandingsItem();
  const taskScore: TaskScore | undefined = useMemo(
    () => taskScores[taskId],
    [taskId, taskScores]
  );

  if (!taskScore) {
    return <span>{"---"}</span>;
  }

  if (taskScore.score <= 0) {
    return <span>{`(${taskScore.numOfSubmissions})`}</span>;
  }

  return <span>{`${taskScore.score}(${taskScore.penalty})`}</span>;
};
