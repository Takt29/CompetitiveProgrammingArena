import {
  Button,
  Container,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  const linkColor = useColorModeValue("teal.600", "green.200");

  return (
    <Container maxWidth={"container.xl"} marginTop={4} marginBottom={4}>
      <Heading as={"h2"} size={"xl"}>
        Not Found
      </Heading>
      <Button variant={"link"} as={Link} to={"/"} color={linkColor}>
        トップページに戻る
      </Button>
    </Container>
  );
};
