import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useAsyncFn } from "react-use";
import { FormProvider, useForm } from "react-hook-form";
import { updateContest } from "../api/contest";
import {
  ContestFormFields,
  ContestFormFieldsData,
} from "../component/contest/form/ContestFormFields";
import { formatDateTime } from "../helper/dateTime";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchContest } from "../hook/firebase/contest";
import { useEffect } from "react";
import { PageContainer } from "../component/common/PageContainer";

type EditContestFormData = ContestFormFieldsData;

export const EditContestPage = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [contest] = useFetchContest(contestId);

  const formMethods = useForm<EditContestFormData>();

  useEffect(() => {
    if (!contest) return;

    const { setValue } = formMethods;

    setValue("name", contest.name);
    setValue("description", contest.description);
    setValue("startAt", formatDateTime(contest.startAt, "YYYY/MM/DD HH:mm"));
    setValue("endAt", formatDateTime(contest.endAt, "YYYY/MM/DD HH:mm"));
    setValue("rule.system", contest.rule.system);
    setValue("rule.penaltyMins", contest.rule.penaltyMins);
  }, [contest, formMethods]);

  const [{ loading }, onSubmit] = useAsyncFn(
    async (data: EditContestFormData) => {
      if (!contestId) return;

      try {
        const { name, description, startAt, endAt, rule } = data;
        await updateContest(contestId, {
          name,
          description: description ?? "",
          startAt: new Date(startAt),
          endAt: new Date(endAt),
          rule,
        });
        toast({
          title: "Contest has been updated!",
          status: "success",
        });
        navigate(`/contests/${contestId}`);
      } catch (e) {
        toast({
          title: "Failed to edit contest",
          status: "error",
        });
        console.error(e);
      }
    },
    [contestId, navigate, toast]
  );

  return (
    <PageContainer>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Box>
              <Heading as="h2" size="lg">
                Edit Contest
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
            <Box textAlign={"right"}>
              <Button type="submit" disabled={loading} isLoading={loading}>
                Apply
              </Button>
            </Box>
          </Stack>
        </form>
      </FormProvider>
    </PageContainer>
  );
};
