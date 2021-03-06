import * as functions from "firebase-functions";
import axios from "axios";
import { unescape } from "html-escaper";

export const fetchAtCoderTask = functions
  .region("asia-northeast1")
  .runWith({
    timeoutSeconds: 10,
    minInstances: 0,
    maxInstances: 10,
    memory: "256MB",
  })
  .https.onCall(async (data, context) => {
    try {
      const uid = context?.auth?.uid;
      const isVerified = context?.auth?.token?.verified;
      // const isAdmin = context?.auth?.token?.admin;

      if (!uid || !isVerified) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          "The function must be called while authenticated."
        );
      }

      const externalTaskId = data.externalTaskId;

      if (
        typeof externalTaskId !== "string" ||
        !/^atcoder:[0-9a-zA-Z_-]+:[0-9a-zA-Z_-]+$/.test(externalTaskId)
      ) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "externalTaskId is invalid."
        );
      }

      const [, contestId, taskId] = externalTaskId.split(":");

      const result = await axios.get(
        `https://atcoder.jp/contests/${contestId}/tasks/${taskId}`,
        {
          timeout: 5 * 1000,
          responseType: "text",
        }
      );

      // TODO: ライブラリを使う
      const scoreMatchRes = result.data.match(
        /<p>(?:配点|Score)\s*:\s*<var>\s*([0-9]+)\s*<\/var>\s*(?:点|Points)<\/p>/
      );
      const titleMatchRes = result.data.match(
        /<span class="h2">\s*[A-Za-z0-9]+ - (.+)\s*(?:<a[^>]*>[^<]*<\/a>)?\s*<\/span>/m
      );

      const taskInfo = {
        score: scoreMatchRes ? parseInt(scoreMatchRes[1], 10) : undefined,
        title: titleMatchRes ? unescape(titleMatchRes[1]) : undefined,
      };

      if (!taskInfo.title) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "cannot get atcoder data"
        );
      }

      return taskInfo;
    } catch (e) {
      console.log(e);

      if (e instanceof functions.https.HttpsError) {
        throw e;
      }

      throw new functions.https.HttpsError("aborted", "internal server error");
    }
  });

export const fetchAtCoderContestTasks = functions
  .region("asia-northeast1")
  .runWith({
    timeoutSeconds: 10,
    minInstances: 0,
    maxInstances: 10,
    memory: "256MB",
  })
  .https.onCall(async (data, context) => {
    try {
      const uid = context?.auth?.uid;
      const isVerified = context?.auth?.token?.verified;

      if (!uid || !isVerified) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          "The function must be called while authenticated."
        );
      }

      const externalContestId = data.externalContestId;

      if (
        typeof externalContestId !== "string" ||
        !/^atcoder:[0-9a-zA-Z_-]+$/.test(externalContestId)
      ) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "externalTaskId is invalid."
        );
      }

      const [, contestId] = externalContestId.split(":");

      const result = await axios.get<string>(
        `https://atcoder.jp/contests/${contestId}/tasks`,
        {
          timeout: 5 * 1000,
          responseType: "text",
        }
      );

      const taskIdsMatchRes = result.data.matchAll(
        /<tr>\s*<td[^>]*>\s*<a\s*href="[^"]+\/([^"]+)">/gm
      );

      return {
        externalTaskIds: [...taskIdsMatchRes].map(
          ([, taskId]) => `atcoder:${contestId}:${taskId}`
        ),
      };
    } catch (e) {
      console.log(e);

      if (e instanceof functions.https.HttpsError) {
        throw e;
      }

      throw new functions.https.HttpsError("aborted", "internal server error");
    }
  });
