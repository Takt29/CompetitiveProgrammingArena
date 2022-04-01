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
          submissionPenalty: 0,
          timePenalty: 0,
          penalty: 0,
        },
        sortKey: [],
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
        createdBy: "functions",
      };

      /* TaskScoreの更新 */
      // TODO: codeforcesのスコア計算
      // TODO: lockoutのスコア計算

      const taskScore: TaskScore = standingsItem.taskScores[taskId] ?? {
        externalScore: 0,
        score: 0,
        submissionPenalty: 0,
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
        taskScore.submissionPenalty = taskScore.numOfSubmissions; // FIXME: WAとACの順が入れ替わる場合を考慮
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
            taskScore.submissionPenalty += 1;
          }
          taskScore.numOfSubmissions += 1;
        }
      }

      standingsItem.taskScores[taskId] = taskScore;

      /* Scoreの更新 */
      const score: StandingsScore = {
        score: 0,
        submissionPenalty: 0,
        timePenalty: 0,
        penalty: 0,
      };

      for (const taskId in standingsItem.taskScores) {
        const taskScore = standingsItem.taskScores[taskId];

        if (taskScore.externalScore > 0 && taskScore.submittedAt) {
          score.submissionPenalty += taskScore.submissionPenalty;
          const taskTimePenalty = Math.floor(
            (taskScore.submittedAt?.toMillis() - contest.startAt.toMillis()) /
              1000
          );

          switch (contest.rule.system) {
            case "atcoder":
              score.score += taskScore.score;
              score.timePenalty = Math.max(score.timePenalty, taskTimePenalty);
              break;
            case "icpc":
              score.score += taskScore.score;
              score.timePenalty += Math.floor(taskTimePenalty / 60);
              break;
            case "icpc_domestic":
              score.score += taskScore.score;
              score.timePenalty += taskTimePenalty;
              break;
            case "codeforces":
            case "joi":
            case "pck":
              score.score += taskScore.score;
              score.timePenalty = Math.max(score.timePenalty, taskTimePenalty);
              break;
            case "lockout":
              score.score += taskScore.score;
              score.timePenalty = Math.max(score.timePenalty, taskTimePenalty);
              break;
            default:
              console.error(`Unknown Contest rule (${contest.rule.system})`);
          }
        }
      }

      const { system, penaltyMins } = contest.rule;

      switch (contest.rule.system) {
        case "atcoder":
          score.penalty =
            score.timePenalty + score.submissionPenalty * penaltyMins * 60;
          break;
        case "icpc":
          score.penalty =
            score.timePenalty + score.submissionPenalty * penaltyMins;
          break;
        case "icpc_domestic":
          score.penalty =
            score.timePenalty + score.submissionPenalty * penaltyMins * 60;
          break;
        case "codeforces":
        case "joi":
        case "pck":
        case "lockout":
          score.penalty = score.timePenalty;
          break;
        default:
          console.error(`Unknown Contest rule (${contest.rule.system})`);
      }

      standingsItem.score = score;

      /* sort keyの更新 */
      let sortKey: number[] = [];

      // TODO: penaltyをちゃんと計算する

      switch (system) {
        case "atcoder":
          sortKey = [score.score, -score.penalty];
          break;
        case "codeforces":
          sortKey = [score.score, 0];
          break;
        case "icpc":
          sortKey = [score.score, -score.penalty];
          break;
        case "icpc_domestic":
          sortKey = [score.score, -score.penalty];
          break;
        case "joi":
          sortKey = [score.score, 0];
          break;
        case "lockout":
          sortKey = [score.score, 0];
          break;
        case "pck":
          sortKey = [score.score, -score.submissionPenalty];
          break;
        default:
          console.error(`Unknown Contest rule (${contest.rule.system})`);
      }

      standingsItem.sortKey = sortKey;

      await tx.set(standingsItemRef, standingsItem);
    });
  });
