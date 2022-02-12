import { AuditFields } from "./auditField";

export type SettingsNamespace = "general" | "notification";

export type GeneralSettings = {
  domain: string;
} & AuditFields;

export type NotificationSettings = {
  slackToken: string;
  discordWebhookUrl: string;
} & AuditFields;

type FireStoreSettingsDict = {
  general: GeneralSettings;
  notification: NotificationSettings;
};

export type FireStoreSettings<T extends SettingsNamespace> =
  FireStoreSettingsDict[T];

export type Settings<T extends SettingsNamespace> = {
  namespaceId: T;
} & FireStoreSettingsDict[T];
