import {
  Box,
  Flex,
  Text,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FiSmartphone } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FormEvent, useRef } from "react";
import NextLink from "next/link";
import { useAppSelector } from "../../redux/hooks";
import Drawer from "../ui/drawer/Drawer";
import UserCart from "../cart/Cart";

const Navbar = () => {
  const cart = useAppSelector((state) => state.cart);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Flex
        position="sticky"
        top="0"
        zIndex={3}
        alignItems="center"
        justifyContent="space-between"
        as="nav"
        w="100%"
        p="8px 0 1rem 0"
        bg="white"
      >
        <HStack paddingInline={["1em", "3em"]} spacing="1">
          <Icon as={FiSmartphone} boxSize="4vmin" />
          <NextLink href="/">
            <a>
              <Text as="h2"> SHOP </Text>
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

        <Button
          ref={btnRef}
          onClick={onOpen}
          aria-label="cart"
          marginInline={["1ch", "2ch"]}
          variant="outline"
          colorScheme="twitter"
          leftIcon={<AiOutlineShoppingCart />}
        >
          <Text as="h4"> {cart.products.length} </Text>
        </Button>
      </Flex>
      <Drawer
        drawerTitle="Cart"
        isOpen={isOpen}
        placement="right"
        size="xl"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <UserCart total={cart.total} products={cart.products} />
      </Drawer>
    </>
  );
};

export default Navbar;
