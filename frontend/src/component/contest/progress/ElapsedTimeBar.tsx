import { Box, Progress, Text, useColorModeValue } from "@chakra-ui/react";
import { useMemo } from "react";
import { formatContestDuration, getDuration } from "../../../helper/dateTime";
import { useNow } from "../../../hook/utility/useNow";
import { Contest } from "../../../type/contest";

type Props = {
  contest: Contest;
};

export const ElapsedTimeBar = (props: Props) => {
  const { contest } = props;
  const now = useNow(1000);

  const elapsedTime = useMemo(() => {
    return getDuration(contest.startAt, now, "seconds");
  }, [contest.startAt, now]);

  const duration = useMemo(() => {
    return getDuration(contest.startAt, contest.endAt, "seconds");
  }, [contest.endAt, contest.startAt]);

  const isFinished = useMemo(
    () => elapsedTime >= duration,
    [duration, elapsedTime]
  );

  const durationText = useMemo(() => {
    return formatContestDuration(contest.startAt, contest.endAt, true);
  }, [contest.endAt, contest.startAt]);

  const elapsedTimeText = useMemo(() => {
    if (isFinished) return durationText;

    return formatContestDuration(contest.startAt, now, true);
  }, [contest.startAt, durationText, isFinished, now]);

  const timeColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box>
      <Progress
        colorScheme={isFinished ? "red" : "green"}
        size="xs"
        value={Math.min(100, Math.max(0, (elapsedTime / duration) * 100))}
        hasStripe
        isAnimated={!isFinished}
      />
      <Box textAlign={"center"}>
        <Text fontSize="sm" color={timeColor}>
          {elapsedTimeText} / {durationText}
        </Text>
      </Box>
    </Box>
  );
};
