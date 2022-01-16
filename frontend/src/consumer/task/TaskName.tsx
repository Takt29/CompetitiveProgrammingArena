import { Link } from "@chakra-ui/react";
import { useMemo } from "react";
import { externalTaskId2Url } from "../../helper/url";
import { useTask } from "../../hook/context/TaskContext";

type Props = {
  link?: boolean;
};

export const TaskName = (props: Props) => {
  const { link } = props;
  const { name, externalTaskId } = useTask();

  const href = useMemo(() => {
    return externalTaskId2Url(externalTaskId) ?? "#";
  }, [externalTaskId]);

  if (link) {
    return (
      <Link href={href} isExternal>
        {name}
      </Link>
    );
  }

  return <span>{name}</span>;
};
