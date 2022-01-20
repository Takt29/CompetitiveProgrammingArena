import { Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import { RegistrationCode } from "../../../type/registrationCode";
import { RegistrationCodeListItem } from "./RegistrationCodeListItem";

type Props = {
  registrationCodes: RegistrationCode[];
};

export const RegistrationCodeList = (props: Props) => {
  const { registrationCodes } = props;

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Created At</Th>
          <Th>Registration Code</Th>
          <Th>Expired At</Th>
          <Th>Used By</Th>
        </Tr>
      </Thead>
      <Tbody>
        {(registrationCodes ?? []).map((code) => (
          <RegistrationCodeListItem key={code.id} registrationCode={code} />
        ))}
      </Tbody>
    </Table>
  );
};
