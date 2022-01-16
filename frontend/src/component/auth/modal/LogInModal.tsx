import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalProps,
  useToast,
} from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import { useAsyncFn } from "react-use";
import { FaTwitter } from "react-icons/fa";
import { auth, authProvider } from "../../../helper/firebase";

type Props = Omit<ModalProps, "children">;

export const LogInModal = (props: Props) => {
  const toast = useToast();

  const [{ loading }, loginWithTwitter] = useAsyncFn(async () => {
    try {
      await signInWithPopup(auth, authProvider);
      toast({
        title: "Login Successful",
        status: "success",
      });
    } catch (e) {
      toast({
        title: "Login Failed",
        status: "error",
      });
      console.log(e);
    }
  }, []);

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          <Button
            colorScheme={"twitter"}
            leftIcon={<FaTwitter />}
            isFullWidth
            marginTop={4}
            marginBottom={4}
            onClick={loginWithTwitter}
            isLoading={loading}
          >
            Login with Twitter
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
