import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { LogInModal } from "../component/auth/modal/LogInModal";
import { RegistrationCodeModal } from "../component/auth/modal/RegistrationCodeModal";
import { SetUpAccountModal } from "../component/auth/modal/SetUpAccountModal";
import { useAuth, useClaims } from "../hook/firebase/auth";
import { useFetchCurrentUser } from "../hook/firebase/user";

export const PrivatePage = () => {
  const [authUser, authLoading, authError] = useAuth();
  const [claims, claimsLoading, claimsError, updateClaims] = useClaims();

  const verified = !!(claims && claims.verified);

  const [user, userLoading, userError] = useFetchCurrentUser({
    disable: !verified,
  });

  if (authLoading || claimsLoading || userLoading) {
    return <Container>{"Initializing User..."}</Container>;
  }

  if (authError || claimsError || (verified && userError)) {
    return (
      <Container>{`Error: ${authError || claimsError || userError}`}</Container>
    );
  }

  if (!authUser) {
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

  if (!verified) {
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

  if (!user) {
    return (
      <Container>
        <SetUpAccountModal
          isOpen
          onClose={() => {
            /* do noting */
          }}
        />
      </Container>
    );
  }

  return <Outlet />;
};
