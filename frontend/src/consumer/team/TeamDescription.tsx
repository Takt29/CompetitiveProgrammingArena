import Linkify from "linkify-react";
import { Fragment } from "react";
import { useTeam } from "../../hook/context/TeamContext";

export const TeamDescription = () => {
  const { description } = useTeam();

  return (
    <Linkify
      tagName={Fragment}
      options={{ nl2br: true, target: "_blank", rel: "noopener noreferrer" }}
    >
      {description}
    </Linkify>
  );
};
