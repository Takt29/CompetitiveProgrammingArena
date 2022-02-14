import { useMemo } from "react";
import { formatDateTime } from "../../helper/dateTime";
import { useRegistrationCode } from "../../hook/context/RegistrationCodeContext";

export const RegistrationCodeExpiredAt = () => {
  const { expiredAt } = useRegistrationCode();

  const formattedExpiredAt = useMemo(
    () => formatDateTime(expiredAt, "YYYY/MM/DD HH:mm:ss"),
    [expiredAt]
  );

  return <span>{formattedExpiredAt}</span>;
};
