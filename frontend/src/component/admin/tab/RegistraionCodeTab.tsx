import { Box, Stack, Button, Icon, useBoolean } from "@chakra-ui/react";
import { limit, orderBy } from "@firebase/firestore";
import { FaPlus } from "react-icons/fa";
import { useFetchRegistrationCodes } from "../../../hook/firebase/registrationCode";
import { RegistrationCodeList } from "../../registrationCode/list/RegistrationCodeList";
import { CreateRegistrationCodeModal } from "../dialog/CreateRegistrationCodeModal";

export const RegistrationCodeTab = () => {
  const [registrationCodes] = useFetchRegistrationCodes([
    orderBy("createdAt", "desc"),
    limit(20),
  ]);

  const [isModalOpen, toggleModal] = useBoolean();

  return (
    <Stack spacing={4}>
      <Box textAlign={"right"}>
        <Button
          variant={"ghost"}
          leftIcon={<Icon as={FaPlus} />}
          onClick={toggleModal.on}
        >
          Create Registration Code
        </Button>
        <CreateRegistrationCodeModal
          isOpen={isModalOpen}
          onClose={toggleModal.off}
        />
      </Box>
      <Box overflowX={"auto"}>
        <RegistrationCodeList registrationCodes={registrationCodes ?? []} />
      </Box>
    </Stack>
  );
};
