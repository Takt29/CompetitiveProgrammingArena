import { useMemo } from "react";
import { formatDateTime } from "../../helper/dateTime";
import { useRegistrationCode } from "../../hook/context/RegistrationCodeContext";

export const RegistrationCodeCreatedAt = () => {
  const { createdAt } = useRegistrationCode();

  const formattedCreatedAt = useMemo(
    () => createdAt && formatDateTime(createdAt, "YYYY/MM/DD HH:mm:ss"),
    [createdAt]
  );

  return <span>{formattedCreatedAt}</span>;
};
