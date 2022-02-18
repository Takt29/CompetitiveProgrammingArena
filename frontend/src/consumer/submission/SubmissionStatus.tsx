import { Badge } from "@chakra-ui/react";
import { useMemo } from "react";
import { useSubmission } from "../../hook/context/SubmissionContext";

export const SubmissionStatus = () => {
  const { status } = useSubmission();

  const color = useMemo(() => (status === "AC" ? "green" : "orange"), [status]);

  return (
    <Badge variant="solid" colorScheme={color}>
      {status}
    </Badge>
  );
};
