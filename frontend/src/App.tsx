import { useRoutes } from "react-router-dom";
import { NavBar } from "./component/nav/NavBar";
import { routes } from "./routes";

export const App = () => {
  const element = useRoutes(routes);

  return (
    <div>
      <NavBar />
      <div>{element}</div>
    </div>
  );
};
