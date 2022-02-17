import { Td, Tr } from "@chakra-ui/react";
import { UserIcon } from "../../../consumer/user/UserIcon";
import { UserName } from "../../../consumer/user/UserName";
import { UserProvider } from "../../../hook/context/UserContext";
import { User } from "../../../type/user";

type Props = {
  member: User;
};

export const TeamMemberListItem = (props: Props) => {
  const { member } = props;

  return (
    <UserProvider value={member}>
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
