import { RouteObject } from "react-router-dom";
import { AdminPage } from "./page/AdminPage";
import { ContestPage } from "./page/ContestPage";
import { ContestsPage } from "./page/ContestsPage";
import { CreateContestPage } from "./page/CreateContestPage";
import { CreateTeamPage } from "./page/CreateTeamPage";
import { EditContestPage } from "./page/EditContestPage";
import { NotFoundPage } from "./page/NotFoundPage";
import { PrivatePage } from "./page/PrivatePage";
import { TeamPage } from "./page/TeamPage";
import { TeamsPage } from "./page/TeamsPage";

export const routes: RouteObject[] = [
  {
    path: "/*",
    element: <PrivatePage />,
    children: [
      {
        path: "",
        element: <ContestsPage />,
      },
      {
        path: "contests/new",
        element: <CreateContestPage />,
      },
      {
        path: "contests/:contestId",
        element: <ContestPage />,
      },
      {
        path: "contests/:contestId/edit",
        element: <EditContestPage />,
      },
      {
        path: "teams",
        element: <TeamsPage />,
      },
      {
        path: "teams/new",
        element: <CreateTeamPage />,
      },
      {
        path: "teams/:teamId",
        element: <TeamPage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
