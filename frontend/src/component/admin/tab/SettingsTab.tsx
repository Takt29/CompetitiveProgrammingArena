import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Stack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { SettingsNamespace } from "../../../type/settings";
import { GeneralSettingsForm } from "../form/GeneralSettingsForm";
import { NotificationSettingsForm } from "../form/NotificationSettingsForm";

const settingsMenu: Record<SettingsNamespace, string> = {
  general: "General",
  notification: "Notification",
};

export const SettingsTab = () => {
  const [selected, setSelected] = useState<SettingsNamespace>("general");

  return (
    <Stack spacing={4}>
      <Box>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {settingsMenu[selected]}
          </MenuButton>
          <MenuList>
            {(
              Object.entries(settingsMenu) as [SettingsNamespace, string][]
            ).map(([key, title]) => (
              <MenuItem key={key} onClick={() => setSelected(key)}>
                {title}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
      <Box overflowX={"auto"}>
        <Box
          rounded={"md"}
          bg={useColorModeValue("gray.50", "gray.700")}
          padding={8}
        >
          {selected === "general" && <GeneralSettingsForm />}
          {selected === "notification" && <NotificationSettingsForm />}
        </Box>
      </Box>
    </Stack>
  );
};
