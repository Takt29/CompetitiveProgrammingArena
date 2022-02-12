import { Box, Button, Stack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAsyncFn } from "react-use";
import { updateSettings, createSettings } from "../../../api/settings";
import { useFetchSettings } from "../../../hook/firebase/settings";
import {
  NotificationSettingsFormFields,
  NotificationSettingsFormFieldsData,
} from "./NotificationSettingsFormFields";

export type NotificationSettingsFormData = NotificationSettingsFormFieldsData;

export const NotificationSettingsForm = () => {
  const toast = useToast();
  const formMethods = useForm<NotificationSettingsFormData>();
  const [notificationSettings] = useFetchSettings("notification");

  useEffect(() => {
    if (!notificationSettings) return;
    formMethods.setValue("slackToken", notificationSettings.slackToken);
    formMethods.setValue(
      "discordWebhookUrl",
      notificationSettings.discordWebhookUrl
    );
  }, [formMethods, notificationSettings]);

  const [{ loading }, onSubmit] = useAsyncFn(
    async (data: NotificationSettingsFormData) => {
      try {
        if (notificationSettings) {
          await updateSettings("notification", data);
        } else {
          await createSettings("notification", data);
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
    [notificationSettings, toast]
  );

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <NotificationSettingsFormFields />
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
