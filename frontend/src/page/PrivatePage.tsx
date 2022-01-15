import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import { useCallback } from "react";
import { FaTwitter } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { auth, authProvider } from "../helper/firebase";
import { useAuth } from "../hook/firebase/auth";

export const PrivatePage = () => {
  const [user, loading, error] = useAuth();

  const loginWithTwitter = useCallback(() => {
    signInWithPopup(auth, authProvider)
      .then((result) => {
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (loading) {
    return <Container>{"Initializing User..."}</Container>;
  }

  if (error) {
    return <Container>{`Error: ${error}`}</Container>;
  }

  if (user) {
    return <Outlet />;
  }

  return (
    <Container>
      {"Unauthenticated"}
      <Modal
        isOpen
        onClose={() => {
          /* do noting */
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log in</ModalHeader>
          <ModalBody>
            <Button
              colorScheme={"twitter"}
              leftIcon={<FaTwitter />}
              isFullWidth
              marginTop={4}
              marginBottom={4}
              onClick={loginWithTwitter}
            >
              Log in with Twitter
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};
