import Linkify from "linkify-react";
import { Fragment } from "react";
import { useContest } from "../../hook/context/ContestContext";

export const ContestDescription = () => {
  const { description } = useContest();

  return (
    <Linkify
      tagName={Fragment}
      options={{ nl2br: true, target: "_blank", rel: "noopener noreferrer" }}
    >
      {description}
    </Linkify>
  );
};
