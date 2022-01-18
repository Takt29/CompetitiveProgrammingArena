import { useRegistrationCode } from "../../hook/context/RegistrationCodeContext";

export const RegistrationCodeText = () => {
  const { id } = useRegistrationCode();

  return <code>{id}</code>;
};
