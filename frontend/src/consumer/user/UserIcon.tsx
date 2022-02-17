import { Avatar, AvatarProps } from "@chakra-ui/react";

type Props = {
  size?: AvatarProps["size"];
};

export const UserIcon = (props: Props) => {
  const { size } = props;

  return <Avatar size={size} />;
};
