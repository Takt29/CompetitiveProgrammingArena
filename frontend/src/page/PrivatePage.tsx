import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { LogInModal } from "../component/auth/modal/LogInModal";
import { RegistrationCodeModal } from "../component/auth/modal/RegistrationCodeModal";
import { useAuth, useClaims } from "../hook/firebase/auth";

export const PrivatePage = () => {
  const [user, loading, error] = useAuth();
  const [claims, claimsLoading, claimsError, updateClaims] = useClaims();

  if (loading || claimsLoading) {
    return <Container>{"Initializing User..."}</Container>;
  }

  if (error || claimsError) {
    return <Container>{`Error: ${error || claimsError}`}</Container>;
  }

  if (!user) {
    return (
      <Container>
        <LogInModal
          isOpen
          onClose={() => {
            /* do noting */
          }}
        />
      </Container>
    );
  }

  if (!claims || !claims.verified) {
    return (
      <Container>
        <RegistrationCodeModal
          isOpen
          onClose={() => {
            /* do noting */
          }}
          onRegisterSuccess={updateClaims}
        />
      </Container>
    );
  }

  return <Outlet />;
};
