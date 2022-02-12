import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { firestore } from "firebase-admin";
import {
  Contest,
  DocumentSnapshot,
  StandingsItem,
  StandingsScore,
  Submission,
  Task,
  TaskScore,
} from "./types";

export const updateStandingsItem = functions
  .region("asia-northeast1")
  .runWith({
    timeoutSeconds: 10,
    minInstances: 0,
    maxInstances: 50,
    memory: "256MB",
  })
  .firestore.document("submissions/{submissionId}")
  .onCreate(async (snap, context) => {
    const db = admin.firestore();

    const submission = snap.data() as Submission;

    const { contestId, taskId, submittedBy } = submission;

    const contestRef = db.collection("contests").doc(contestId);
    const taskRef = db.collection("tasks").doc(taskId);

    const standingsItemRef = contestRef
      .collection("standings")
      .doc(submittedBy);

    await db.runTransaction(async (tx) => {
      const standingsItemDoc = (await tx.get(
        standingsItemRef
      )) as DocumentSnapshot<StandingsItem>;
      const contestDoc = (await tx.get(
        contestRef
      )) as DocumentSnapshot<Contest>;
      const taskDoc = (await tx.get(taskRef)) as DocumentSnapshot<Task>;

      const contest = contestDoc.data();
      const task = taskDoc.data();

      if (!contest) {
        console.error(`Not found contest (${contestId}).`);
        return;
      }
      if (!task) {
        console.error(`Not found task (${taskId}).`);
        return;
      }

      const standingsItem: StandingsItem = standingsItemDoc.data() ?? {
        contestId,
        taskScores: {},
        score: {
          score: 0,
          penalty: 0,
          submittedAt: null,
        },
        sortKey: [],
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
        createdBy: "functions",
      };

      /* TaskScoreの更新 */

      const taskScore: TaskScore = standingsItem.taskScores[taskId] ?? {
        externalScore: 0,
        score: 0,
        penalty: 0,
        submittedAt: 0,
        numOfSubmissions: 0,
      };

      if (taskScore.externalScore < submission.score) {
        taskScore.externalScore = submission.score;
        if (task.originalScore) {
          taskScore.score = Math.round(
            (submission.score / task.originalScore) * task.score
          );
        } else {
          taskScore.score = submission.score ? task.score : 0;
        }
        taskScore.penalty = taskScore.numOfSubmissions; // FIXME: WAとACの順が入れ替わる場合を考慮
        taskScore.submittedAt = submission.submittedAt;
        if (submission.status !== "IE" && submission.status !== "CE") {
          taskScore.numOfSubmissions += 1;
        }
      } else {
        if (submission.status !== "IE" && submission.status !== "CE") {
          if (
            taskScore.submittedAt &&
            taskScore.submittedAt.toMillis() > submission.submittedAt.toMillis()
          ) {
            taskScore.penalty += 1;
          }
          taskScore.numOfSubmissions += 1;
        }
      }

      standingsItem.taskScores[taskId] = taskScore;

      /* Scoreの更新 */
      const score: StandingsScore = {
        score: 0,
        penalty: 0,
        submittedAt: null,
      };

      for (const taskId in standingsItem.taskScores) {
        const taskScore = standingsItem.taskScores[taskId];

        if (taskScore.externalScore > 0) {
          score.score += taskScore.score;
          score.penalty += taskScore.penalty;
          if (
            taskScore.submittedAt !== null &&
            (score.submittedAt == null ||
              score.submittedAt.toMillis() < taskScore.submittedAt?.toMillis())
          ) {
            score.submittedAt = taskScore.submittedAt;
          }
        }
      }

      standingsItem.score = score;

      /* sort keyの更新 */
      let sortKey: number[] = [];

      const { system, penaltyMins } = contest.rule;

      // TODO: penaltyをちゃんと計算する

      switch (system) {
        case "atcoder":
          sortKey = [score.score, -score.penalty * penaltyMins];
          break;
        case "codeforces":
          sortKey = [score.score, 0];
          break;
        case "icpc":
          sortKey = [score.score, -score.penalty * penaltyMins];
          break;
        case "icpc_domestic":
          sortKey = [score.score, -score.penalty * penaltyMins * 60];
          break;
        case "joi":
          sortKey = [score.score, 0];
          break;
        case "lockout":
          sortKey = [score.score, 0];
          break;
        case "pck":
          sortKey = [score.score, -score.penalty];
          break;
        default:
          console.error(`Unknown Contest rule (${contest.rule.system})`);
      }

      standingsItem.sortKey = sortKey;

      console.log(standingsItem);

      await tx.set(standingsItemRef, standingsItem);
    });
  });
