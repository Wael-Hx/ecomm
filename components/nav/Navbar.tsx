import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { FiSmartphone } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FormEvent } from "react";
import NextLink from "next/link";

const Navbar = () => {
  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Flex
      position="sticky"
      top="0"
      zIndex={3}
      alignItems="center"
      justifyContent="space-between"
      as="nav"
      w="100%"
      p="8px 0 2rem 0"
      bg="white"
    >
      <HStack paddingInline={["1em", "3em"]} spacing="1">
        <Icon as={FiSmartphone} boxSize="4vmin" />
        <NextLink href="/">
          <a>
            <Heading
              fontFamily="Raleway"
              fontSize="clamp(1.2rem ,2.6vmin,4rem )"
            >
              {" "}
              SHOP{" "}
            </Heading>
          </a>
        </NextLink>
      </HStack>

      <Box as="form" w="75%" onSubmit={submitSearch}>
        <InputGroup paddingInline={["1ch", "2ch"]}>
          <Input type="text" placeholder="search..." />
          <IconButton
            marginInline="0.5rem"
            variant="outline"
            icon={<BiSearchAlt color="gray.300" />}
            aria-label="search"
            type="submit"
          />
        </InputGroup>
      </Box>

      <HStack paddingInline={["1ch", "2ch"]} spacing="1">
        <Icon as={AiOutlineShoppingCart} boxSize="4vmin" />
        <Heading fontWeight="normal" fontSize="clamp(1.2rem ,2.6vmin,4rem )">
          0
        </Heading>
      </HStack>
    </Flex>
  );
};

export default Navbar;
