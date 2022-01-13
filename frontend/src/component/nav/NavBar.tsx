import {
  Box,
  Flex,
  Menu,
  useColorModeValue,
  Button,
  MenuButton,
  Avatar,
  MenuList,
  MenuDivider,
  Center,
  MenuItem,
  Icon,
  Stack,
  IconButton,
  useBoolean,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { DrawerNav } from "./DrawerNav";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useBoolean();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems="center" justifyContent={"space-between"}>
          <Flex alignItems={"center"}>
            <Stack direction={"row"}>
              <IconButton
                variant={"link"}
                icon={<Icon as={FaBars} />}
                aria-label="Open Drawer"
                onClick={setIsOpen.on}
              />
              <Box as={ReactRouterLink} to="/">
                Competitive Programming Arena
              </Box>
            </Stack>
          </Flex>
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                src={"https://avatars.dicebear.com/api/male/username.svg"}
              />
            </MenuButton>
            <MenuList alignItems={"center"}>
              <Center>
                <p>Username</p>
              </Center>
              <MenuDivider />
              <MenuItem icon={<Icon as={FaCog} />}>Account Settings</MenuItem>
              <MenuItem icon={<Icon as={FaSignOutAlt} />}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
      <DrawerNav isOpen={isOpen} onClose={setIsOpen.off} />
    </>
  );
};
