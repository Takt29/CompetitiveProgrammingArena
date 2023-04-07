import {
  Box,
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
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import { Pattern } from "../../../constant/Pattern";
import { StandingsSystemType } from "../../../constant/StandingsSystem";
import { StandingsSystemName } from "../../../constant/StandingsSystemName";
import { formatDateTime } from "../../../helper/dateTime";

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

const StartAtAutoFillItems = [
  ["now", 0],
  ["in 5 minutes", 5],
  ["in 10 minutes", 10],
] as const;

const EndAtAutoFillItems = [
  ["60 minutes", 60],
  ["100 minutes", 100],
  ["120 minutes", 120],
  ["300 minutes", 300],
] as const;

export const ContestFormFields = () => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
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
          placeholder="YYYY/MM/DD hh:mm"
          {...register("startAt", {
            required: true,
            pattern: Pattern.DATE_TIME,
          })}
        />
        <FormHelperText>
          <Text as="span" marginRight={2}>
            Auto Fill:
          </Text>
          {StartAtAutoFillItems.map(([text, mins]) => (
            <Box
              key={text}
              as="button"
              type="button"
              textDecorationLine="underline"
              marginRight={2}
              onClick={() =>
                setValue(
                  "startAt",
                  formatDateTime(
                    dayjs().add(mins, "minutes"),
                    "YYYY/MM/DD HH:mm"
                  )
                )
              }
            >
              {text}
            </Box>
          ))}
        </FormHelperText>
      </FormControl>
      <FormControl isInvalid={!!errors.endAt}>
        <FormLabel htmlFor="endAt">endAt</FormLabel>
        <Input
          placeholder="YYYY/MM/DD hh:mm"
          {...register("endAt", {
            required: true,
            pattern: Pattern.DATE_TIME,
          })}
        />
        <FormHelperText>
          <Text as="span" marginRight={2}>
            Auto Fill:
          </Text>
          {EndAtAutoFillItems.map(([text, duration]) => (
            <Box
              key={text}
              as="button"
              type="button"
              textDecorationLine="underline"
              marginRight={2}
              onClick={() =>
                setValue(
                  "endAt",
                  formatDateTime(
                    dayjs(getValues()["startAt"]).add(duration, "minutes"),
                    "YYYY/MM/DD HH:mm"
                  )
                )
              }
            >
              {text}
            </Box>
          ))}
        </FormHelperText>
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
