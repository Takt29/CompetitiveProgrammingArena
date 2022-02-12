import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
import * as dayjs from "dayjs";

import {
  User,
  Contest,
  DocumentSnapshot,
  Timestamp,
  NotificationSettings,
  GeneralSettings,
} from "./types";

export const getDuration = (
  begin: Timestamp,
  end: Timestamp,
  unit: dayjs.UnitType
) => {
  return dayjs(end.toDate()).diff(dayjs(begin.toDate()), unit);
};

export const notifyContestCreation = functions
  .region("asia-northeast1")
  .runWith({
    timeoutSeconds: 10,
    minInstances: 0,
    maxInstances: 10,
    memory: "256MB",
  })
  .firestore.document("contests/{contestId}")
  .onCreate(async (snap, context) => {
    const db = admin.firestore();

    const contest = snap.data() as Contest;

    const userRef = db.collection("users").doc(contest.createdBy);
    const userSnapshot = (await userRef.get()) as DocumentSnapshot<User>;
    const user = userSnapshot.data();

    const generalSettingsSnapshot = (await db
      .collection("settings")
      .doc("general")
      .get()) as DocumentSnapshot<GeneralSettings>;
    const generalSettings = generalSettingsSnapshot.data();

    const notificationSettingsSnapshot = (await db
      .collection("settings")
      .doc("notification")
      .get()) as DocumentSnapshot<NotificationSettings>;
    const notificationSettings = notificationSettingsSnapshot.data();

    const durationHours = getDuration(contest.startAt, contest.endAt, "hours");
    const durationMinutes =
      getDuration(contest.startAt, contest.endAt, "minutes") % 60;

    const startAt = dayjs(contest.startAt.toDate()).format("YYYY/MM/DD HH:mm");
    const contestUrl =
      generalSettings?.domain &&
      `${generalSettings.domain}/contests/${context.params.contestId}`;

    const message =
      "" +
      "新しいコンテストが作成されました。\n" +
      "\n" +
      `${contest.name}\n` +
      `作成者: ${user?.name}\n` +
      `開始時刻: ${startAt}\n` +
      `コンテスト時間: ${durationHours}:${durationMinutes
        .toString()
        .padStart(2, "0")}\n` +
      `${contestUrl}\n`;

    if (notificationSettings?.discordWebhookUrl) {
      await axios.post(notificationSettings.discordWebhookUrl, {
        content: message,
      });
    }
  });
