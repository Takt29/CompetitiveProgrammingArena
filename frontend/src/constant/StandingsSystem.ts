export const StandingsSystem = {
  AtCoder: "atcoder",
  ICPC: "icpc",
  ICPCDomestic: "icpc_domestic",
  JOI: "joi",
  PCK: "pck",
  Codeforces: "codeforces",
  Lockout: "lockout",
} as const;

export type StandingsSystemType =
  typeof StandingsSystem[keyof typeof StandingsSystem];
