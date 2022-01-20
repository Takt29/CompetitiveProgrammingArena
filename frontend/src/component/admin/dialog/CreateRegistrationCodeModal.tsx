import { Button } from "@chakra-ui/button";
import { Box, Stack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/modal";
import { Timestamp } from "@firebase/firestore";
import dayjs from "dayjs";
import { FormProvider, useForm } from "react-hook-form";
import { useAsyncFn } from "react-use";
import { createRegistraitionCode } from "../../../api/registrationCode";
import { formatDateTime } from "../../../helper/dateTime";
import { RegistrationCodeFormFields } from "../form/RegistrationCodeFormFields";

type Props = Omit<ModalProps, "children">;

type CreateRegistrationCodeFormData = RegistrationCodeFormFields;

export const CreateRegistrationCodeModal = (props: Props) => {
  const formMethods = useForm<CreateRegistrationCodeFormData>({
    defaultValues: {
      expiredAt: formatDateTime(dayjs().add(7, "days"), "YYYY/MM/DD HH:mm"),
    },
  });

  const [{ loading }, onSubmit] = useAsyncFn(
    async (data: CreateRegistrationCodeFormData) => {
      await createRegistraitionCode({
        expiredAt: Timestamp.fromDate(new Date(data.expiredAt)),
      });
      props.onClose();
    },
    [props.onClose]
  );

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Registration Code</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <RegistrationCodeFormFields />
                <Box textAlign={"right"}>
                  <Button type="submit" loading={loading} disabled={loading}>
                    Create
                  </Button>
                </Box>
              </Stack>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
