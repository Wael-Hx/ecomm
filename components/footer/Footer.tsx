import { Text, VStack } from "@chakra-ui/react";
import ContactFrom from "./ContactForm";

const Footer = () => {
  return (
    <VStack
      as="footer"
      color="white"
      minH="30em"
      w="100%"
      justifyContent="space-between"
      bg="#2a2a2a"
    >
      <VStack
        w={{
          base: "100%",
          md: "50%",
        }}
        h="100%"
        alignItems="start"
        marginInline="auto"
        padding="8px"
      >
        <Text as="h2" p="1rem 0 0.3rem 0" fontWeight="normal">
          Send me a Message
        </Text>
        <ContactFrom />
      </VStack>
      <Text
        as="em"
        fontSize="sm"
        fontFamily="Montserrat"
        fontWeight="normal"
        width="max-content"
      >
        this is a demo website
      </Text>
    </VStack>
  );
};

export default Footer;
