import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { RegistrationCodeExpiredAt } from "../../../consumer/registrationCode/RegistraionCodeExpiredAt";
import { RegistrationCodeCreatedAt } from "../../../consumer/registrationCode/RegistrationCodeCreatedAt";
import { RegistrationCodeText } from "../../../consumer/registrationCode/RegistrationCodeText";
import { RegistrationCodeUsedBy } from "../../../consumer/registrationCode/RegistrationCodeUsedBy";
import { RegistrationCodeProvider } from "../../../hook/context/RegistrationCodeContext";
import { RegistrationCode } from "../../../type/registrationcode";
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
