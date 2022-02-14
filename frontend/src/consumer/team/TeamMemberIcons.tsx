import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { FaEllipsisH } from "react-icons/fa";
// import { useTeam } from "../../hook/context/TeamContext";

export const TeamMemberIcons = () => {
  // const { id } = useTeam();

  return (
    <AvatarGroup size="md" colorScheme="gray">
      <Avatar />
      <Avatar />
      <Avatar icon={<FaEllipsisH />} bg="gray" />
    </AvatarGroup>
  );
};
