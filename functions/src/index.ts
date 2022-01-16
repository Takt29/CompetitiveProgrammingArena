import * as functions from "firebase-functions";
import axios from "axios";

export const fetchAtCoderTask = functions.https.onCall(
  async (data, context) => {
    try {
      const uid = context?.auth?.uid;
      const isVerified = context?.auth?.token?.verified;
      // const isAdmin = context?.auth?.token?.admin;

      console.log(JSON.stringify(context?.auth));

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
        title: titleMatchRes ? titleMatchRes[1] : undefined,
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
  }
);
