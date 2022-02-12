import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

export type GeneralSettingsFormFieldsData = {
  domain: string;
};

export const GeneralSettingsFormFields = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<GeneralSettingsFormFieldsData>();

  const autofillDomain = useCallback(() => {
    setValue("domain", location.origin);
  }, [setValue]);

  return (
    <>
      <FormControl isInvalid={!!errors.domain}>
        <FormLabel htmlFor="domain">Site Domain</FormLabel>
        <InputGroup>
          <Input
            paddingRight={24}
            {...register("domain", { pattern: /https?:\/\// })}
          />
          <InputRightElement width={24}>
            <Button size={"sm"} onClick={autofillDomain}>
              Autofill
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
};
