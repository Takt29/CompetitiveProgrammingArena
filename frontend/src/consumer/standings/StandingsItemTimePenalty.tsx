import { useMemo } from "react";
import { StandingsSystemType } from "../../constant/StandingsSystem";
import { useContest } from "../../hook/context/ContestContext";
import { useStandingsItem } from "../../hook/context/StandingsItemContext";

export const StandingsItemTimePenalty = () => {
  const {
    rule: { system },
  } = useContest();
  const {
    score: { score, penalty },
  } = useStandingsItem();

  const duration = useMemo(() => {
    if (!score || score <= 0) {
      return <span>{"--:--"}</span>;
    }

    return getTimePenalty(system, penalty);
  }, [penalty, score, system]);

  return <span>{duration}</span>;
};

const getTimePenalty = (system: StandingsSystemType, penalty: number) => {
  switch (system) {
    case "atcoder":
    case "joi":
    case "pck":
    case "codeforces":
    case "lockout": {
      const minutes = Math.floor(penalty / 60);
      const seconds = penalty % 60;

      const minutesStr = minutes.toString().padStart(2, "0");
      const secondsStr = seconds.toString().padStart(2, "0");

      return `${minutesStr}:${secondsStr}`;
    }
    case "icpc":
    case "icpc_domestic": {
      return `${penalty}`;
    }
    default: {
      return "??:??";
    }
  }
};
