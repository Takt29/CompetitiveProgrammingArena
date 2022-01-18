import { Box, Stack, Button, Icon } from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { FaPlus } from "react-icons/fa";
import { Link as ReactRouterLink } from "react-router-dom";
import { RegistrationCodeExpiredAt } from "../../../consumer/registrationCode/RegistraionCodeExpiredAt";
import { RegistrationCodeCreatedAt } from "../../../consumer/registrationCode/RegistrationCodeCreatedAt";
import { RegistrationCodeText } from "../../../consumer/registrationCode/RegistrationCodeText";
import { RegistrationCodeUsedBy } from "../../../consumer/registrationCode/RegistrationCodeUsedBy";
import { RegistrationCodeProvider } from "../../../hook/context/RegistrationCodeContext";
import { useFetchRegistrationCodes } from "../../../hook/firebase/registrationCode";

export const RegistrationCodeTab = () => {
  const [registrationCodes] = useFetchRegistrationCodes();

  return (
    <Stack spacing={4}>
      <Box textAlign={"right"}>
        <Button variant={"ghost"} leftIcon={<Icon as={FaPlus} />}>
          Create Registration Code
        </Button>
      </Box>
      <Box overflowX={"auto"}>
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
              <RegistrationCodeProvider key={code.id} value={code}>
                <Tr>
                  <Td>
                    <RegistrationCodeCreatedAt />
                  </Td>
                  <Td>
                    <RegistrationCodeText />
                  </Td>
                  <Td>
                    <RegistrationCodeExpiredAt />
                  </Td>
                  <Td>
                    <RegistrationCodeUsedBy />
                  </Td>
                </Tr>
              </RegistrationCodeProvider>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Stack>
  );
};
