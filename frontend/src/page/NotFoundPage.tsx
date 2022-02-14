import { Button, Heading, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PageContainer } from "../component/common/PageContainer";

export const NotFoundPage = () => {
  const linkColor = useColorModeValue("teal.600", "green.200");

  return (
    <PageContainer>
      <Heading as={"h2"} size={"xl"}>
        Not Found
      </Heading>
      <Button variant={"link"} as={Link} to={"/"} color={linkColor}>
        トップページに戻る
      </Button>
    </PageContainer>
  );
};
