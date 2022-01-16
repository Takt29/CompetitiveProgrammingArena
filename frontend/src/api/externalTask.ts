import axios from "axios";
import { httpsCallable } from "firebase/functions";
import { functions } from "../helper/firebase";

export type TaskInformation = {
  externalTaskId: string;
  title?: string | undefined;
  score?: number | undefined;
};

const fetchAtCoderTask = httpsCallable<
  { externalTaskId: string },
  { title: string; score?: number }
>(functions, "fetchAtCoderTask");

const fetchAOJTask = async (taskId: string) => {
  let apiUrl = "";
  if (/^[0-9]+$/.test(taskId)) {
    const volumeId = taskId.substring(0, 2);
    apiUrl = `https://judgeapi.u-aizu.ac.jp/problems/volumes/${volumeId}`;
  } else {
    const courseId = taskId.split("_")[0];
    apiUrl = `https://judgeapi.u-aizu.ac.jp/problems/courses/${courseId}`;
  }

  const result = await axios.get(apiUrl, {
    timeout: 5 * 1000,
    responseType: "json",
  });

  if (result.data?.numberOfProblems) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const problems: any[] = result.data.problems;
    const problem = problems.find(({ id }) => taskId === id);
    if (problem) {
      return {
        title: problem.name,
      };
    }
  }

  return undefined;
};

const fetchCodeforcesTask = async (contestId: string, taskId: string) => {
  const apiUrl = `https://codeforces.com/api/contest.standings?from=1&count=1&contestId=${contestId}`;

  const result = await axios.get(apiUrl, {
    timeout: 5 * 1000,
    responseType: "json",
  });

  if (result.data?.status === "OK") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const problems: any[] = result.data?.result?.problems;
    const problem = problems.find(({ index }) => taskId === index);
    if (problem) {
      const { name, points } = problem;
      return {
        title: name,
        score: points ? parseInt(points) : undefined,
      };
    }
  }

  return undefined;
};

export const fetchTaskInformation = async (
  externalTaskId: string
): Promise<TaskInformation | undefined> => {
  const [site, contestId, taskId] = externalTaskId.split(":");

  switch (site) {
    case "atcoder": {
      const result = await fetchAtCoderTask({ externalTaskId });
      return {
        externalTaskId,
        ...result.data,
      };
    }
    case "aoj": {
      const result = await fetchAOJTask(taskId);
      if (!result) return undefined;
      return {
        externalTaskId,
        ...result,
      };
    }
    case "codeforces": {
      const result = await fetchCodeforcesTask(contestId, taskId);
      if (!result) return undefined;
      return {
        externalTaskId,
        ...result,
      };
      break;
    }
  }

  return undefined;
};
