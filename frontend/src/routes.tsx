import { RouteObject } from "react-router-dom";
import { ContestsPage } from "./page/ContestsPage";
import { NotFoundPage } from "./page/NotFoundPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <ContestsPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
