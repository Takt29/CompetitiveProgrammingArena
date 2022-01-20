import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalProps,
  useToast,
  ModalCloseButton,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useAsyncFn } from "react-use";
import { FormProvider, useForm } from "react-hook-form";
import {
  UserFormFields,
  UserFormFieldsData,
} from "../../user/form/UserFormFields";
import { updateUser } from "../../../api/user";
import { useEffect } from "react";
import { useFetchCurrentUser } from "../../../hook/firebase/user";

type Props = Omit<ModalProps, "children">;
type EditAccountFormData = UserFormFieldsData;

export const EditAccountModal = (props: Props) => {
  const { onClose } = props;

  const [user, loadingUser] = useFetchCurrentUser();
  const toast = useToast();

  const formMethods = useForm<EditAccountFormData>();
  const {
    reset,
    formState: { isDirty },
  } = formMethods;

  useEffect(() => {
    if (!isDirty && user) {
      reset({
        name: user.name,
        externalAccountId: {
          ...user.externalAccountId,
        },
      });
    }
  }, [user, reset, isDirty]);

  const [{ loading }, onSubmit] = useAsyncFn(
    async (data: EditAccountFormData) => {
      if (!user) return;

      try {
        await updateUser(user.id, data);
        toast({
          title: "Edit Successful",
          status: "success",
        });
        onClose();
      } catch (e) {
        toast({
          title: "Failed to edit",
          status: "error",
        });
        console.log(e);
      }
    },
    [toast, user, onClose]
  );

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Your Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {user && !loadingUser && (
            <FormProvider {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  <UserFormFields />
                  <Button
                    isFullWidth
                    marginTop={4}
                    marginBottom={4}
                    type={"submit"}
                    isLoading={loading}
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </FormProvider>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
