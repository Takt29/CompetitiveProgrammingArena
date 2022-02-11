import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useAsyncFn } from "react-use";
import { FormProvider, useForm } from "react-hook-form";
import { createContest } from "../api/contest";
import {
  ContestFormFields,
  ContestFormFieldsData,
} from "../component/contest/form/ContestFormFields";
import { formatDateTime } from "../helper/dateTime";
import {
  ContestTaskFormFields,
  ContestTaskFormFieldsData,
} from "../component/contest/form/ContestTaskFormFields";
import { StandingsSystem } from "../constant/StandingsSystem";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

type CreateContestFormData = ContestFormFieldsData & ContestTaskFormFieldsData;

export const CreateContestPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const formMethods = useForm<CreateContestFormData>({
    defaultValues: {
      startAt: formatDateTime(dayjs().add(20, "minutes"), "YYYY/MM/DD HH:mm"),
      endAt: formatDateTime(
        dayjs().add(20 + 60 * 2, "minutes"),
        "YYYY/MM/DD HH:mm"
      ),
      rule: {
        system: StandingsSystem.AtCoder,
        penaltyMins: 5,
      },
    },
  });

  const [{ loading }, onSubmit] = useAsyncFn(
    async (data: CreateContestFormData) => {
      try {
        const { name, description, startAt, endAt, rule, tasks } = data;
        const { contestId } = await createContest(
          {
            name,
            description: description ?? "",
            startAt: new Date(startAt),
            endAt: new Date(endAt),
            rule,
          },
          (tasks || []).map(
            ({ name, externalTaskId, score, originalScore }) => ({
              name,
              externalTaskId,
              score: score ? parseInt(score, 10) : 100,
              originalScore: originalScore ? parseInt(originalScore, 10) : 0,
            })
          )
        );
        toast({
          title: "Contest has been created!",
          status: "success",
        });
        navigate(`/contests/${contestId}`);
      } catch (e) {
        console.log(e);
        toast({
          title: "Failed to create contest",
          status: "error",
        });
      }
    },
    [navigate, toast]
  );

  return (
    <Container maxWidth={"container.xl"} marginTop={4} marginBottom={4}>
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
