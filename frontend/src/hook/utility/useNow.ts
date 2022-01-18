import { useInterval } from "@chakra-ui/hooks";
import { useState } from "react";

export const useNow = (intervalMillis: number) => {
  const [now, setNow] = useState<Date>(new Date());
  useInterval(() => {
    setNow(new Date());
  }, intervalMillis);
  return now;
};
