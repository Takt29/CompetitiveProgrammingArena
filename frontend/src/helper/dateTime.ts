import dayjs, { UnitType } from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

type InputDate = string | number | Date | dayjs.Dayjs;

export const formatDateTime = (dateTime: InputDate, formatStr: string) => {
  return dayjs(dateTime).format(formatStr);
};

export const getDuration = (
  begin: InputDate,
  end: InputDate,
  unit: UnitType
) => {
  return dayjs(end).diff(begin, unit);
};

export const formatDuration = (
  begin: InputDate,
  end: InputDate,
  formatStr: string
) => {
  const duration = dayjs.duration(dayjs(end).diff(dayjs(begin)));
  return duration.format(formatStr);
};
