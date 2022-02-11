import { Timestamp } from "firebase/firestore";
import { useMemo } from "react";
import { StandingsSystemType } from "../../constant/StandingsSystem";
import { getDuration } from "../../helper/dateTime";
import { useContest } from "../../hook/context/ContestContext";
import { useStandingsItem } from "../../hook/context/StandingsItemContext";

export const StandingsItemTimePenalty = () => {
  const {
    startAt,
    rule: { system, penaltyMins },
  } = useContest();
  const {
    score: { score, submittedAt, penalty },
  } = useStandingsItem();

  const duration = useMemo(() => {
    if (!score || score <= 0 || !submittedAt || !startAt) {
      return <span>{"--:--"}</span>;
    }

    return getTimePenalty(system, startAt, submittedAt, penalty, penaltyMins);
  }, [penalty, penaltyMins, score, startAt, submittedAt, system]);

  return <span>{duration}</span>;
};

const getTimePenalty = (
  system: StandingsSystemType,
  startAt: Timestamp,
  submittedAt: Timestamp,
  penalty: number,
  penaltyMins: number
) => {
  if (system === "atcoder") {
    const timePenalty = submittedAt.toDate();
    timePenalty.setMinutes(timePenalty.getMinutes() + penalty * penaltyMins);

    const minutes = getDuration(startAt, timePenalty, "minutes");
    const seconds = getDuration(startAt, timePenalty, "seconds") % 60;

    const minutesStr = minutes.toString().padStart(2, "0");
    const secondsStr = seconds.toString().padStart(2, "0");

    return `${minutesStr}:${secondsStr}`;
  }
  if (system === "joi" || system === "pck") {
    const minutes = getDuration(startAt, submittedAt, "minutes");
    const seconds = getDuration(startAt, submittedAt, "seconds") % 60;

    const minutesStr = minutes.toString().padStart(2, "0");
    const secondsStr = seconds.toString().padStart(2, "0");

    return `${minutesStr}:${secondsStr}`;
  }

  // TODO: 他のコンテスト方式に対応

  return `??:??`;
};
