import { Link } from "@chakra-ui/react";
import { ReactNode, useMemo } from "react";
import { useSubmission } from "../../hook/context/SubmissionContext";

type Props = {
  children: ReactNode;
};

export const SubmissionExternalLink = (props: Props) => {
  const { children } = props;
  const { externalSubmissionId } = useSubmission();

  const href = useMemo(() => {
    const [site, contestId, submissionId] = externalSubmissionId.split(":");
    switch (site) {
      case "atcoder":
        return `https://atcoder.jp/contests/${contestId}/submissions/${submissionId}`;
      case "aoj":
        return `https://judge.u-aizu.ac.jp/onlinejudge/review.jsp?rid=${submissionId}`;
      case "codeforces":
        return `https://codeforces.com/contest/${contestId}/submission/${submissionId}`;
      default:
        return "#";
    }
  }, [externalSubmissionId]);

  return (
    <Link href={href} isExternal>
      {children}
    </Link>
  );
};
