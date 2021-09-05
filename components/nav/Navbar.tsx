import { Flex, Heading, HStack, Icon } from "@chakra-ui/react";
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
      p="8px 0 2.6rem 0"
      bg="white"
    >
      <HStack paddingInline={["1em", "3em"]} spacing="1">
        <Icon as={FiSmartphone} boxSize="4vmin" />
        <Heading fontSize="clamp(1.2rem ,3.5vmin,4rem )"> SHOP </Heading>
      </HStack>

      <HStack paddingInline={["1em", "3em"]} spacing="2">
        <Icon as={BiSearchAlt} boxSize="4vmin" />
        <HStack spacing="1">
          <Icon as={AiOutlineShoppingCart} boxSize="4vmin" />
          <Heading fontWeight="normal" fontSize="clamp(1.2rem ,3.5vmin,4rem )">
            0
          </Heading>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Navbar;
