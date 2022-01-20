import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Timestamp } from "@firebase/firestore";
import { useFormContext } from "react-hook-form";
import { Pattern } from "../../../constant/Pettern";

export type RegistrationCodeFormFields = {
  expiredAt: string;
};

export const RegistrationCodeFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationCodeFormFields>();

  return (
    <>
      <FormControl isInvalid={!!errors.expiredAt}>
        <FormLabel htmlFor="expiredAt">Expired At</FormLabel>
        <Input
          {...register("expiredAt", {
            required: true,
            pattern: Pattern.DATE_TIME,
          })}
        />
      </FormControl>
    </>
  );
};
