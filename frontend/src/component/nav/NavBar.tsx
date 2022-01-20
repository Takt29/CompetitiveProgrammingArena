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
import { useAuth, useLogout } from "../../hook/firebase/auth";
import { UserProvider } from "../../hook/context/UserContext";
import { useFetchCurrentUser } from "../../hook/firebase/user";
import { UserName } from "../../consumer/user/UserName";
import { EditAccountModal } from "../auth/modal/EditAccountModal";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useBoolean();
  const [isAccountSettingOpen, setAccountSettingOpen] = useBoolean();
  const [authUser] = useAuth();
  const [user] = useFetchCurrentUser();
  const logout = useLogout();

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
          {authUser && user && (
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={authUser.photoURL ?? ""} />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <Center>
                  <UserProvider value={user}>
                    <UserName />
                  </UserProvider>
                </Center>
                <MenuDivider />
                <MenuItem
                  icon={<Icon as={FaCog} />}
                  onClick={setAccountSettingOpen.on}
                >
                  Account Settings
                </MenuItem>
                <MenuItem icon={<Icon as={FaSignOutAlt} />} onClick={logout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Box>
      <DrawerNav isOpen={isOpen} onClose={setIsOpen.off} />
      <EditAccountModal
        isOpen={isAccountSettingOpen}
        onClose={setAccountSettingOpen.off}
      />
    </>
  );
};
