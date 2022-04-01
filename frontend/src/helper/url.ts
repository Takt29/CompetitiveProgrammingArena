const AOJ_V1_TASK_URL_REGEX =
  /https?:\/\/judge\.u-aizu\.ac\.jp\/onlinejudge\/description\.jsp(?:\?id=([0-9A-Z_]+)|\?.+&id=([0-9A-Z_]+))/;
const AOJ_V2_TASK_URL_REGEX =
  /https?:\/\/onlinejudge.u-aizu.ac.jp\/(?:[a-zA-Z0-9]+\/)+([0-9A-Z_]+)/;
const CF_PROBLEMSET_TASK_URL_REGEX =
  /https?:\/\/(?:www\.)?codeforces\.com\/problemset\/problem\/([0-9]+)\/([A-Z0-9]+)$/;
const CF_CONTEST_TASK_URL_REGEX =
  /https?:\/\/(?:www\.)?codeforces\.com\/contest\/([0-9]+)\/problem\/([A-Z0-9]+)$/;
const ATCODER_OLD_TASK_URL_REGEX =
  /https?:\/\/(.+).contest.atcoder.jp\/tasks\/([^?/#]+)/;
const ATCODER_NEW_TASK_URL_REGEX =
  /https?:\/\/(?:beta.)?atcoder.jp\/contests\/([^?/#]+)\/tasks\/([^?/#]+)/;

export const url2ExternalTaskId = (url: string) => {
  // Aizu Online Judge
  const aojV1Result = url.match(AOJ_V1_TASK_URL_REGEX);
  if (aojV1Result) {
    return `aoj::${aojV1Result[1]}`;
  }
  const aojV2Result = url.match(AOJ_V2_TASK_URL_REGEX);
  if (aojV2Result) {
    return `aoj::${aojV2Result[1]}`;
  }

  // Codeforces
  const cfProblemsetResult = url.match(CF_PROBLEMSET_TASK_URL_REGEX);
  if (cfProblemsetResult) {
    return `codeforces:${cfProblemsetResult[1]}:${cfProblemsetResult[2]}`;
  }
  const cfContestResult = url.match(CF_CONTEST_TASK_URL_REGEX);
  if (cfContestResult) {
    return `codeforces:${cfContestResult[1]}:${cfContestResult[2]}`;
  }

  // AtCoder
  const atcoderOldResult = url.match(ATCODER_OLD_TASK_URL_REGEX);
  if (atcoderOldResult) {
    return `atcoder:${atcoderOldResult[1]}:${atcoderOldResult[2]}`;
  }
  const atcoderNewResult = url.match(ATCODER_NEW_TASK_URL_REGEX);
  if (atcoderNewResult) {
    return `atcoder:${atcoderNewResult[1]}:${atcoderNewResult[2]}`;
  }

  return undefined;
};

const EXTERNAL_TASK_ID_REGEX = /^(atcoder|aoj|codeforces):[^/:?&]*:[^/:?&]+$/;

export const externalTaskId2Url = (externalTaskId: string) => {
  if (EXTERNAL_TASK_ID_REGEX.test(externalTaskId) === false) {
    return undefined;
  }

  const [site, contestId, problemId] = externalTaskId.split(":");

  switch (site) {
    case "atcoder":
      return `https://atcoder.jp/contests/${contestId}/tasks/${problemId}`;
    case "aoj":
      return `https://onlinejudge.u-aizu.ac.jp/problems/${problemId}`;
    case "codeforces":
      return `https://codeforces.com/problemset/problem/${contestId}/${problemId}`;
  }

  return undefined;
};

const ATCODER_CONTEST_URL_REGEX =
  /https?:\/\/(?:beta.)?atcoder.jp\/contests\/([^?/#]+)(?:\/tasks|\/standings|\/editorial)?\/?(?:[?#].*)?\s*$/;

export const url2ExternalContestId = (url: string) => {
  // AtCoder
  const atcoderResult = url.match(ATCODER_CONTEST_URL_REGEX);
  if (atcoderResult) {
    return `atcoder:${atcoderResult[1]}`;
  }

  return undefined;
};
