import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const PageContainer = (props: Props) => {
  const { children } = props;
  return (
    <Container maxWidth={"container.xl"} marginTop={4} marginBottom={4}>
      {children}
    </Container>
  );
};
