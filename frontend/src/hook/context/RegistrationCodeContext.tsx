import { createContext, useContext } from "react";
import { RegistrationCode } from "../../type/registrationCode";

const RegistrationCodeContext = createContext<RegistrationCode | null>(null);

export const RegistrationCodeProvider = RegistrationCodeContext.Provider;

export const useRegistrationCode = (): RegistrationCode => {
  const context = useContext(RegistrationCodeContext);
  if (!context) {
    throw new Error(
      "useRegistrationCode must be used inside RegistrationCodeProvider."
    );
  }
  return context;
};
