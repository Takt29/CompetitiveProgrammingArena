import { Link } from "@chakra-ui/react";
import { useMemo } from "react";
import { externalTaskId2Url } from "../../helper/url";
import { useTask } from "../../hook/context/TaskContext";

type Props = {
  link?: boolean;
  withIndex?: boolean;
};

export const TaskName = (props: Props) => {
  const { link, withIndex } = props;
  const { name, externalTaskId, index } = useTask();

  const href = useMemo(() => {
    return externalTaskId2Url(externalTaskId) ?? "#";
  }, [externalTaskId]);

  const title = useMemo(() => {
    return withIndex ? `${index} - ${name}` : name;
  }, [index, name, withIndex]);

  if (link) {
    return (
      <Link href={href} isExternal>
        {title}
      </Link>
    );
  }

  return <span>{title}</span>;
};
