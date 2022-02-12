import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export type NotificationSettingsFormFieldsData = {
  slackToken: string;
  discordWebhookUrl: string;
};

export const NotificationSettingsFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<NotificationSettingsFormFieldsData>();

  return (
    <>
      <FormControl isInvalid={!!errors.slackToken}>
        <FormLabel htmlFor="slackToken">Slack Token</FormLabel>
        <Input {...register("slackToken")} />
      </FormControl>
      <FormControl isInvalid={!!errors.discordWebhookUrl}>
        <FormLabel htmlFor="discordWebhookUrl">Discord Webhook URL</FormLabel>
        <Input {...register("discordWebhookUrl")} />
      </FormControl>
    </>
  );
};
