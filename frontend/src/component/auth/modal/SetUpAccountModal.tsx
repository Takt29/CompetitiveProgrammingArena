import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalProps,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { useAsyncFn } from "react-use";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../../../hook/firebase/auth";
import {
  UserFormFields,
  UserFormFieldsData,
} from "../../user/form/UserFormFields";
import { createUser } from "../../../api/user";

type Props = Omit<ModalProps, "children">;
type SetUpUserFormData = UserFormFieldsData;

export const SetUpUserModal = (props: Props) => {
  const [user] = useAuth();
  const toast = useToast();

  const formMethods = useForm<SetUpUserFormData>();

  const [{ loading }, onSubmit] = useAsyncFn(
    async (data: SetUpUserFormData) => {
      if (!user) return;

      try {
        await createUser(user?.uid, data);
        toast({
          title: "Set Up Successful",
          status: "success",
        });
      } catch (e) {
        toast({
          title: "Set Up Failed",
          status: "error",
        });
        console.log(e);
      }
    },
    [toast, user]
  );

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Set Up Your Account</ModalHeader>
        <ModalBody>
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <UserFormFields />
              </Stack>
              <Button
                isFullWidth
                marginTop={4}
                marginBottom={4}
                type={"submit"}
                isLoading={loading}
              >
                Submit
              </Button>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};