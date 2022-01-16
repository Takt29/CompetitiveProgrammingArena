import { useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAsync } from "react-use";
import { auth } from "../../helper/firebase";

export const useAuth = () => {
  return useAuthState(auth);
};

type Claims = {
  admin: boolean;
  verified: boolean;
};

export const useClaims = () => {
  const [user, loading, error] = useAuthState(auth);
  const [claims, setClaims] = useState<Claims | undefined>(undefined);

  const getClaims = useCallback(async () => {
    const result = await auth.currentUser?.getIdTokenResult(true);
    const claims = result?.claims;
    if (!claims) return undefined;

    return {
      admin: !!claims.admin,
      verified: !!claims.verified,
    };
  }, []);

  const { loading: loadingClaim, error: errorClaim } = useAsync(async () => {
    const claims = await getClaims();
    setClaims(claims);
  }, [user, getClaims]);

  const update = useCallback(async () => {
    const claims = await getClaims();
    setClaims(claims);
  }, [getClaims]);

  return [
    claims,
    loading || loadingClaim,
    error || errorClaim,
    update,
  ] as const;
};
