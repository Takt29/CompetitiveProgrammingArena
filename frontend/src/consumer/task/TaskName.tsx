import { Link } from "@chakra-ui/react";
import { useMemo } from "react";
import { useTask } from "../../hook/context/TaskContext";

type Props = {
  link?: boolean;
};

export const TaskName = (props: Props) => {
  const { link } = props;
  const { name, externalTaskId } = useTask();

  const href = useMemo(() => {
    const [site, contestId, problemId] = externalTaskId.split(":");
    switch (site) {
      case "atcoder":
        return `https://atcoder.jp/contests/${contestId}/tasks/${problemId}`;
      case "aoj":
        return `https://onlinejudge.u-aizu.ac.jp/problems/${problemId}`;
      case "codeforces":
        return `https://codeforces.com/problemset/problem/${contestId}/${problemId}`;
      default:
        return "#";
    }
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
