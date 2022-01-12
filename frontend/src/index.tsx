import { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { IconContext } from "react-icons";

render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
          <App />
        </IconContext.Provider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("app")
);
