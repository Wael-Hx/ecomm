import {
  Grid,
  GridProps,
  HStack,
  VStack,
  Box,
  Image,
  Text,
  Heading,
  Button,
  useOutsideClick,
} from "@chakra-ui/react";
import { Smartphone } from "../../types";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { MdAddShoppingCart } from "react-icons/md";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../cart/cartSlice";
import { useRef } from "react";

const MotionGrid = motion<GridProps>(Grid);

const Search = (props: SearchBoxProps) => {
  const dispatch = useAppDispatch();
  const searchBoxRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: searchBoxRef,
    handler: () => props.close(),
  });
  const add = (product: Smartphone) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        storage: product.storage[0],
        ram: product.ram[0],
        color: product.colors[0],
        price: product.price,
        specs: product.specs,
        qty: 1,
      })
    );
  };

  if (!props.isOpen) {
    return null;
  }

  return (
    <MotionGrid
      ref={searchBoxRef}
      animate={{
        y: "-10vh",
        opacity: 1,

        transition: {
          type: "spring",
        },
      }}
      initial={{
        x: "-50%",
        left: "50%",
        top: "20vh",
      }}
      h="65vh"
      opacity="0"
      pos="fixed"
      w={["95%", "80%"]}
      templateColumns="1fr"
      autoRows="minmax(11rem , 20%)"
      bg="white"
      overflowX="hidden"
      overflowY="auto"
      borderRadius="lg"
      boxShadow="md"
      border="1px solid silver"
    >
      {props.results.length === 0 && (
        <Text as="h3" textAlign="center">
          No results...
        </Text>
      )}
      {props.results.map((product) => (
        <HStack
          key={product.id}
          h="100%"
          w={["100%", "90%"]}
          p="1.5"
          spacing="4"
        >
          <Box ml="2%" h="75%" alignSelf="start" css={{ aspectRatio: "9/12" }}>
            <Image h="100%" w="100%" src={product.image} alt={product.name} />
          </Box>
          <VStack alignItems="start" h="100%">
            <NextLink href={`/p/${product.id}`}>
              <a>
                <Heading
                  textDecoration="underline"
                  textTransform="capitalize"
                  as="h1"
                  size="1rem"
                >
                  {product.name}
                </Heading>
              </a>
            </NextLink>
            <Text d="flex" as="h6">
              Colors:
              {product.colors.map((color) => (
                <Box
                  key={color}
                  ml="1ch"
                  w="1rem"
                  h="1rem"
                  borderRadius="40%"
                  border="1px solid"
                  bg={color}
                />
              ))}
            </Text>
            <Text as="h6">
              Storage: {product.storage.map((val) => `${val}GB`).join(" | ")}
              Gb
            </Text>
            <HStack spacing="2">
              <Button
                fontSize="0.75rem"
                variant="outline"
                leftIcon={<MdAddShoppingCart />}
                onClick={() => add(product)}
              >
                ${product.price}
              </Button>
            </HStack>
          </VStack>
        </HStack>
      ))}
    </MotionGrid>
  );
};

export default Search;

interface SearchBoxProps {
  results: Smartphone[];
  close: () => void;
  isOpen: boolean;
}
