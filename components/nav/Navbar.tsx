import { Flex, Heading, HStack } from "@chakra-ui/react";
import { FiSmartphone } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  return (
    <Flex
      position="sticky"
      top="0"
      zIndex={3}
      alignItems="center"
      justifyContent="space-between"
      as="nav"
      w="100%"
      h="3em"
      bg="white"
    >
      <HStack paddingInline={["1em", "3em"]} spacing="1">
        <FiSmartphone size="1.3em" />
        <Heading size="md"> SHOP </Heading>
      </HStack>

      <HStack paddingInline={["1em", "3em"]} spacing="2">
        <BiSearchAlt size="1.3em" />
        <HStack spacing="1">
          <AiOutlineShoppingCart size="1.3em" />
          <Heading size="md"> 0 </Heading>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Navbar;
