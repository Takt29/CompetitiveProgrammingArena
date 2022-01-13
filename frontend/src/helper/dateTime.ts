import dayjs, { UnitType } from "dayjs";
import duration from "dayjs/plugin/duration";
import { Timestamp } from "firebase/firestore";

dayjs.extend(duration);

type InputDate = string | number | Date | dayjs.Dayjs | Timestamp;

const toDayJs = (inputDate: InputDate) => {
  if (inputDate instanceof Timestamp) {
    return dayjs(inputDate.toDate());
  }
  return dayjs(inputDate);
};

export const formatDateTime = (dateTime: InputDate, formatStr: string) => {
  return toDayJs(dateTime).format(formatStr);
};

export const getDuration = (
  begin: InputDate,
  end: InputDate,
  unit: UnitType
) => {
  return toDayJs(end).diff(toDayJs(begin), unit);
};

export const formatDuration = (
  begin: InputDate,
  end: InputDate,
  formatStr: string
) => {
  const duration = dayjs.duration(toDayJs(end).diff(toDayJs(begin)));
  return duration.format(formatStr);
};
