import { RouteObject } from "react-router-dom";
import { ContestPage } from "./page/ContestPage";
import { ContestsPage } from "./page/ContestsPage";
import { CreateContestPage } from "./page/CreateContestPage";
import { NotFoundPage } from "./page/NotFoundPage";
import { PrivatePage } from "./page/PrivatePage";

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
