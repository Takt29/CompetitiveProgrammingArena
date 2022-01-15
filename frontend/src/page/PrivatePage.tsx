import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { LogInModal } from "../component/auth/modal/LogInModal";
import { useAuth } from "../hook/firebase/auth";

export const PrivatePage = () => {
  const [user, loading, error] = useAuth();

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
      <LogInModal
        isOpen
        onClose={() => {
          /* do noting */
        }}
      />
    </Container>
  );
};
