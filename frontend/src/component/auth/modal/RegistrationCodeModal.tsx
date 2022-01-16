import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalProps,
  useToast,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { useAsyncFn } from "react-use";
import { useForm } from "react-hook-form";
import { verifyAccount } from "../../../api/auth";
import { useAuth } from "../../../hook/firebase/auth";

type Props = Omit<ModalProps, "children"> & {
  onRegisterSuccess?: () => void;
};
type RegistrationCodeFormData = { registrationCode: string };

export const RegistrationCodeModal = (props: Props) => {
  const { onRegisterSuccess, ...modalProps } = props;

  const [user] = useAuth();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationCodeFormData>();

  const [{ loading }, onSubmit] = useAsyncFn(
    async ({ registrationCode }: RegistrationCodeFormData) => {
      try {
        await verifyAccount({ registrationCode });
        toast({
          title: "Registration Successful",
          status: "success",
        });
        onRegisterSuccess?.();
      } catch (e) {
        toast({
          title: "Registration Failed",
          status: "error",
        });
        console.log(e);
      }
    },
    [toast, user, onRegisterSuccess]
  );

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Register</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.registrationCode}>
              <FormLabel htmlFor="registrationCode">
                Registration Code
              </FormLabel>
              <Input
                type="text"
                {...register("registrationCode", { required: true })}
              />
            </FormControl>
            <Button
              isFullWidth
              marginTop={4}
              marginBottom={4}
              type={"submit"}
              isLoading={loading}
            >
              Register
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
