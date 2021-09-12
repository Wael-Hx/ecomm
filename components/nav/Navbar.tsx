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
  useBoolean,
} from "@chakra-ui/react";
import { FiSmartphone } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FormEvent, useRef, ChangeEvent, useMemo, useState } from "react";
import NextLink from "next/link";
import { useAppSelector } from "../../redux/hooks";
import Drawer from "../ui/drawer/Drawer";
import UserCart from "../cart/Cart";
import { Smartphone } from "../../types";
import Search from "./Search";
import { useRouter } from "next/router";

const Navbar = (props: NavbarProps) => {
  const cart = useAppSelector((state) => state.cart);
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openSearchBox, { on, off }] = useBoolean(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [search, setSearch] = useState("");

  const results = useMemo(() => {
    let smartphones = props.smartphones || [];
    if (search.trim().length < 3) {
      return [];
    }
    return smartphones.filter((phone) =>
      phone.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }, [search, props.smartphones]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    on();
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

        {router.pathname === "/" && (
          <Box as="form" w="75%" onSubmit={submitSearch}>
            <InputGroup paddingInline={["1ch", "2ch"]}>
              <Input
                onChange={onSearchChange}
                type="text"
                placeholder="search..."
              />
              <IconButton
                marginInline="0.5rem"
                variant="outline"
                icon={<BiSearchAlt color="gray.300" />}
                aria-label="search"
                type="submit"
              />
            </InputGroup>

            <Search isOpen={openSearchBox} close={off} results={results} />
          </Box>
        )}

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

interface NavbarProps {
  smartphones?: Smartphone[];
}
