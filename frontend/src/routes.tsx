import { RouteObject } from "react-router-dom";
import { HomePage } from "./page/HomePage";
import { NotFoundPage } from "./page/NotFoundPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
