import { RouteObject } from "react-router-dom";
import { ContestPage } from "./page/ContestPage";
import { ContestsPage } from "./page/ContestsPage";
import { NotFoundPage } from "./page/NotFoundPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <ContestsPage />,
  },
  {
    path: "/contests/:contestId",
    element: <ContestPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
