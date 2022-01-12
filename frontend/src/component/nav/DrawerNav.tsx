import {
  Box,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { FaTrophy, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ColorModeSwitch } from "./ColorModeSwitch";
import { DrawerNavItem } from "./DrawerNavItem";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const DrawerNav = (props: Props) => {
  const { onClose, isOpen } = props;

  const navigate = useNavigate();

  const onClickNavItem = useCallback(
    (to: string) => {
      navigate(to);
      onClose();
    },
    [navigate, onClose]
  );

  return (
    <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <Flex
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={"100vh"}
        >
          <Flex
            padding={"5%"}
            width={"100%"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            as={"nav"}
            marginTop={4}
          >
            <DrawerNavItem
              to={"/"}
              title={"Contests"}
              icon={FaTrophy}
              onClick={onClickNavItem}
            />
            <DrawerNavItem
              to={"/teams"}
              title={"Teams"}
              icon={FaUsers}
              onClick={onClickNavItem}
            />
          </Flex>

          <Flex
            padding={"5%"}
            flexDirection={"column"}
            width={"100%"}
            alignItems={"flex-start"}
            marginBottom={4}
          >
            <Divider />
            <Box marginTop={4}>
              <ColorModeSwitch />
            </Box>
          </Flex>
        </Flex>
      </DrawerContent>
    </Drawer>
  );
};
