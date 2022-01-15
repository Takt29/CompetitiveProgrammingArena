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
import { useAuth } from "../../hook/firebase/auth";
import { useCallback } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../helper/firebase";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useBoolean();
  const [user] = useAuth();

  const logout = useCallback(() => {
    signOut(auth);
  }, []);

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
          {user && (
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={user.photoURL ?? ""} />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <Center>
                  <p>{user.displayName}</p>
                </Center>
                <MenuDivider />
                <MenuItem icon={<Icon as={FaCog} />}>Account Settings</MenuItem>
                <MenuItem icon={<Icon as={FaSignOutAlt} />} onClick={logout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Box>
      <DrawerNav isOpen={isOpen} onClose={setIsOpen.off} />
    </>
  );
};
