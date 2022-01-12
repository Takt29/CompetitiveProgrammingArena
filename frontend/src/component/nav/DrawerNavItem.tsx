import { Flex, Icon, Link, useColorModeValue, Text } from "@chakra-ui/react";
import { ReactNode, useMemo } from "react";
import { IconType } from "react-icons";
import {
  matchPath,
  useLocation,
  Link as ReactRouterLink,
} from "react-router-dom";

type Props = {
  to: string;
  icon: IconType;
  title: ReactNode;
  onClick: (to: string) => void;
};

export const DrawerNavItem = (props: Props) => {
  const { to, icon, title, onClick } = props;

  const location = useLocation();
  const active = useMemo(
    () => !!matchPath(location.pathname, to),
    [location, to]
  );

  const activeBackgroundColor = useColorModeValue("green.50", "teal.800");
  const iconColor = useColorModeValue("green.400", "teal.100");

  return (
    <Link
      backgroundColor={active ? activeBackgroundColor : undefined}
      padding={3}
      borderRadius={8}
      _hover={{
        textDecoration: "none",
        backgroundColor: activeBackgroundColor,
      }}
      width={"100%"}
      marginBottom={2}
      onClick={() => onClick(to)}
    >
      <Flex>
        <Icon as={icon} fontSize="xl" color={iconColor} />
        <Text marginLeft={5} display={"flex"}>
          {title}
        </Text>
      </Flex>
    </Link>
  );
};
