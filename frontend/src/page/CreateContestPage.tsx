import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAsyncFn } from "react-use";
import { FormProvider, useForm } from "react-hook-form";
import { createContest } from "../api/contest";
import {
  ContestFormFields,
  ContestFormFieldsData,
} from "../component/contest/form/ContestFormFields";
import { formatDateTime } from "../helper/dateTime";
import { ContestTaskFormFields } from "../component/contest/form/ContestTaskFormFields";

type CreateContestFormData = ContestFormFieldsData;

export const CreateContestPage = () => {
  const formMethods = useForm<CreateContestFormData>({
    defaultValues: {
      startAt: formatDateTime(new Date(), "YYYY/MM/DD HH:mm"),
      endAt: formatDateTime(
        new Date(new Date().getTime() + 1000 * 60 * 60 * 2),
        "YYYY/MM/DD HH:mm"
      ),
    },
  });

  const [{ loading }, onSubmit] = useAsyncFn(
    async (data: CreateContestFormData) => {
      const { name, description, startAt, endAt } = data;
      await createContest({
        name,
        description: description ?? "",
        startAt: new Date(startAt),
        endAt: new Date(endAt),
      });
    },
    []
  );

  return (
    <Container maxWidth={"container.lg"} marginTop={4} marginBottom={4}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Box>
              <Heading as="h2" size="lg">
                Create Contest
              </Heading>
              <Divider marginTop={1} />
            </Box>

            <Box
              rounded={"md"}
              bg={useColorModeValue("gray.50", "gray.700")}
              padding={8}
            >
              <Stack spacing={4}>
                <Box>
                  <Heading as="h3" size="md">
                    Information
                  </Heading>
                  <Divider marginTop={1} />
                </Box>
                <ContestFormFields />
              </Stack>
            </Box>
            <Box
              rounded={"md"}
              bg={useColorModeValue("gray.50", "gray.700")}
              padding={8}
            >
              <Stack spacing={4}>
                <Box>
                  <Heading as="h3" size="md">
                    Contest Tasks
                  </Heading>
                  <Divider marginTop={1} />
                </Box>
                <ContestTaskFormFields />
              </Stack>
            </Box>
            <Box textAlign={"right"}>
              <Button type="submit" disabled={loading} isLoading={loading}>
                Submit
              </Button>
            </Box>
          </Stack>
        </form>
      </FormProvider>
    </Container>
  );
};
