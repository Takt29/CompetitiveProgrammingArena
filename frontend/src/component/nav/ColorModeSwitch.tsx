import { FormControl, FormLabel, Switch, useColorMode } from "@chakra-ui/react";

export const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  console.log(colorMode === "dark");

  return (
    <FormControl display="flex" alignItems="center" textAlign={"center"}>
      <FormLabel htmlFor="dark-mode" marginBottom={0}>
        DarkMode
      </FormLabel>
      <Switch
        id="dark-mode"
        defaultChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
    </FormControl>
  );
};
