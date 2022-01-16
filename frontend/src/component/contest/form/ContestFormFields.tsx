import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { StandingsSystemType } from "../../../constant/StandingsSystem";
import { StandingsSystemName } from "../../../constant/StandingsSystemName";

export type ContestFormFieldsData = {
  name: string;
  description?: string;
  startAt: string;
  endAt: string;
  rule: {
    system: StandingsSystemType;
    penaltyMins: number;
  };
};

const DateTimePattern =
  /^[12][0-9]{3}\/(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9]) (2[0-3]|[01]?[0-9]):[0-5]?[0-9]$/;

export const ContestFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ContestFormFieldsData>();

  return (
    <>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Contest Name</FormLabel>
        <Input {...register("name", { required: true })} />
      </FormControl>
      <FormControl isInvalid={!!errors.description}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea {...register("description")} />
      </FormControl>
      <FormControl isInvalid={!!errors.startAt}>
        <FormLabel htmlFor="startAt">startAt</FormLabel>
        <Input
          {...register("startAt", {
            required: true,
            pattern: DateTimePattern,
          })}
        />
        <FormHelperText>YYYY/MM/DD hh:mm</FormHelperText>
      </FormControl>
      <FormControl isInvalid={!!errors.endAt}>
        <FormLabel htmlFor="endAt">endAt</FormLabel>
        <Input
          {...register("endAt", {
            required: true,
            pattern: DateTimePattern,
          })}
        />
        <FormHelperText>YYYY/MM/DD hh:mm</FormHelperText>
      </FormControl>
      <FormControl isInvalid={!!errors.rule?.system}>
        <FormLabel htmlFor="rule_system">Standings System</FormLabel>
        <Select {...register("rule.system", { required: true })}>
          {Object.entries(StandingsSystemName).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isInvalid={!!errors.rule?.penaltyMins}>
        <FormLabel htmlFor="rule_penalty">Penalty(minutes)</FormLabel>
        <NumberInput min={0} max={99} precision={0}>
          <NumberInputField
            {...register("rule.penaltyMins", { required: true })}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </>
  );
};
