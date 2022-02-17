import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAsyncFn } from "react-use";
import { createTeam } from "../api/team";
import { PageContainer } from "../component/common/PageContainer";
import {
  TeamFormFields,
  TeamFormFieldsData,
} from "../component/team/form/TeamFormFields";
import {
  TeamMembersFormFields,
  TeamMembersFormFieldsData,
} from "../component/team/form/TeamMembersFormFields";

type CreateTeamFormData = TeamFormFieldsData & TeamMembersFormFieldsData;

export const CreateTeamPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const formMethods = useForm<CreateTeamFormData>();

  const [{ loading }, onSubmit] = useAsyncFn(
    async (data: CreateTeamFormData) => {
      try {
        const { name, description, members } = data;
        const { teamId } = await createTeam(
          {
            name,
            description: description ?? "",
          },
          (members ?? []).map((member) => ({
            userId: member.userId,
          }))
        );
        toast({
          title: "Team has been created!",
          status: "success",
        });
        navigate(`/teams/${teamId}`);
      } catch (e) {
        console.log(e);
        toast({
          title: "Failed to create team",
          status: "error",
        });
      }
    },
    [navigate, toast]
  );

  return (
    <PageContainer>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Box>
              <Heading as="h2" size="lg">
                Create Team
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
                <TeamFormFields />
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
                    Members
                  </Heading>
                  <Divider marginTop={1} />
                </Box>
                <TeamMembersFormFields />
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
    </PageContainer>
  );
};
