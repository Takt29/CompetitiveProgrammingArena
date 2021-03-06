import { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ChakraProvider, localStorageManager } from "@chakra-ui/react";
import { theme } from "./theme";
import { IconContext } from "react-icons";

render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme} colorModeManager={localStorageManager}>
        <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
          <App />
        </IconContext.Provider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("app")
);
