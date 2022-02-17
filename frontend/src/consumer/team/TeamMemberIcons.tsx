import { Avatar, AvatarGroup, AvatarGroupProps } from "@chakra-ui/react";
import { FaEllipsisH } from "react-icons/fa";
// import { useTeam } from "../../hook/context/TeamContext";

type Props = {
  size?: AvatarGroupProps["size"];
};

export const TeamMemberIcons = (props: Props) => {
  const { size } = props;
  // const { id } = useTeam();

  return (
    <AvatarGroup size={size}>
      <Avatar />
      <Avatar />
      <Avatar icon={<FaEllipsisH />} bg="gray" />
    </AvatarGroup>
  );
};
