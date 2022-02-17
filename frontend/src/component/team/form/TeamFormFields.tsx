import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export type TeamFormFieldsData = {
  name: string;
  description?: string;
};

export const TeamFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TeamFormFieldsData>();

  return (
    <>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Team Name</FormLabel>
        <Input {...register("name", { required: true })} />
      </FormControl>
      <FormControl isInvalid={!!errors.description}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea {...register("description")} />
      </FormControl>
    </>
  );
};
