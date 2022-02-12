import { Box, Button, Stack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAsyncFn } from "react-use";
import { createSettings, updateSettings } from "../../../api/settings";
import { useFetchSettings } from "../../../hook/firebase/settings";
import {
  GeneralSettingsFormFields,
  GeneralSettingsFormFieldsData,
} from "./GeneralSettingsFormFields";

export type GeneralSettingsFormData = GeneralSettingsFormFieldsData;

export const GeneralSettingsForm = () => {
  const toast = useToast();
  const formMethods = useForm<GeneralSettingsFormData>();
  const [generalSettings] = useFetchSettings("general");

  useEffect(() => {
    if (!generalSettings) return;
    formMethods.setValue("domain", generalSettings.domain);
  }, [formMethods, generalSettings]);

  const [{ loading }, onSubmit] = useAsyncFn(
    async (data: GeneralSettingsFormData) => {
      try {
        if (generalSettings) {
          await updateSettings("general", data);
        } else {
          await createSettings("general", data);
        }
        toast({
          title: "Edit Successful",
          status: "success",
        });
      } catch (e) {
        toast({
          title: "Failed to edit",
          status: "error",
        });
        console.error(e);
      }
    },
    [generalSettings, toast]
  );

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <GeneralSettingsFormFields />
            <Box textAlign={"right"}>
              <Button type="submit" disabled={loading} isLoading={loading}>
                Apply
              </Button>
            </Box>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
};
