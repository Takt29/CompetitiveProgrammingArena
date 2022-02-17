import { Td, Tr } from "@chakra-ui/react";
import { UserIcon } from "../../../consumer/user/UserIcon";
import { UserName } from "../../../consumer/user/UserName";
import { UserProvider } from "../../../hook/context/UserContext";
import { useFetchUser } from "../../../hook/firebase/user";
import { TeamMember } from "../../../type/team";

type Props = {
  member: TeamMember;
};

export const TeamMemberListItem = (props: Props) => {
  const { member } = props;
  const [user] = useFetchUser(member.userId);

  if (!user) return null;

  return (
    <UserProvider value={user}>
      <Tr>
        <Td>
          <UserIcon size={"sm"} />
        </Td>
        <Td>
          <UserName />
        </Td>
      </Tr>
    </UserProvider>
  );
};
