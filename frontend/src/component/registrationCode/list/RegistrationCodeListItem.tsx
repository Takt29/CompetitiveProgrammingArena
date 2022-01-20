import { Tr, Td, Button, useClipboard } from "@chakra-ui/react";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";
import { RegistrationCodeExpiredAt } from "../../../consumer/registrationCode/RegistrationCodeExpiredAt";
import { RegistrationCodeCreatedAt } from "../../../consumer/registrationCode/RegistrationCodeCreatedAt";
import { RegistrationCodeText } from "../../../consumer/registrationCode/RegistrationCodeText";
import { RegistrationCodeUsedBy } from "../../../consumer/registrationCode/RegistrationCodeUsedBy";
import { RegistrationCodeProvider } from "../../../hook/context/RegistrationCodeContext";
import { RegistrationCode } from "../../../type/registrationCode";

type Props = {
  registrationCode: RegistrationCode;
};

export const RegistrationCodeListItem = (props: Props) => {
  const { registrationCode } = props;
  const { onCopy, hasCopied } = useClipboard(registrationCode.id);

  return (
    <RegistrationCodeProvider value={registrationCode}>
      <Tr>
        <Td>
          <RegistrationCodeCreatedAt />
        </Td>
        <Td>
          <RegistrationCodeText />
          <Button
            variant={"link"}
            leftIcon={hasCopied ? <FaClipboardCheck /> : <FaClipboard />}
            colorScheme={hasCopied ? "teal" : undefined}
            onClick={onCopy}
          />
        </Td>
        <Td>
          <RegistrationCodeExpiredAt />
        </Td>
        <Td>
          <RegistrationCodeUsedBy />
        </Td>
      </Tr>
    </RegistrationCodeProvider>
  );
};
