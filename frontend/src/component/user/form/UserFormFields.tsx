import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export type UserFormFieldsData = {
  name: string;
  externalAccountId: {
    atcoder?: string;
    codeforces?: string;
    aoj?: string;
  };
};

export const UserFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserFormFieldsData>();

  return (
    <>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">User Name</FormLabel>
        <Input
          type="text"
          {...register("name", { required: true, maxLength: 20 })}
        />
      </FormControl>
      <FormControl isInvalid={!!errors.externalAccountId?.atcoder}>
        <FormLabel htmlFor="externalAccountId.atcoder">AtCoder ID</FormLabel>
        <Input
          type="text"
          {...register("externalAccountId.atcoder", {
            maxLength: 50,
          })}
        />
      </FormControl>
      <FormControl isInvalid={!!errors.externalAccountId?.aoj}>
        <FormLabel htmlFor="externalAccountId.aoj">AOJ ID</FormLabel>
        <Input
          type="text"
          {...register("externalAccountId.aoj", {
            maxLength: 50,
          })}
        />
      </FormControl>
      <FormControl isInvalid={!!errors.externalAccountId?.aoj}>
        <FormLabel htmlFor="externalAccountId.codeforces">
          Codeforces ID
        </FormLabel>
        <Input
          type="text"
          {...register("externalAccountId.codeforces", {
            maxLength: 50,
          })}
        />
      </FormControl>
    </>
  );
};
