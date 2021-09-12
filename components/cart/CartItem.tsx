import {
  HStack,
  Box,
  Image,
  VStack,
  Text,
  IconButton,
  Heading,
  Select,
} from "@chakra-ui/react";
import { IoBagRemoveOutline } from "react-icons/io5";
import { useAppDispatch } from "../../redux/hooks";
import { CartItem } from "../../types";
import { addToCart, removeFromCart } from "./cartSlice";
import NextLink from "next/link";
import { useState, ChangeEvent } from "react";

const CartProduct = ({ product }: CartItemProps) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(product.qty);

  const onQuantityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let newQty = e.target.value ? Number(e.target.value) : 1;
    setQuantity(newQty);
    dispatch(addToCart({ ...product, qty: newQty }));
  };

  const remove = () => {
    dispatch(removeFromCart(product));
  };
  return (
    <HStack h="100%" w={["100%", "90%"]} justifyContent="space-between" p="1.5">
      <HStack h="100%" spacing="4">
        <Box ml="2%" h="75%" alignSelf="start" css={{ aspectRatio: "9/12" }}>
          <Image h="100%" w="100%" src={product.image} alt={product.name} />
        </Box>
        <VStack alignItems="start" h="100%">
          <NextLink href={`/p/${product.id}`} passHref>
            <a>
              <Heading textTransform="capitalize" as="h1" size="1rem">
                <Box as="span" color="blue.600">
                  {product.qty}
                </Box>{" "}
                / {product.name}
              </Heading>
            </a>
          </NextLink>
          <Text d="flex" as="h6">
            Color:
            <Box
              ml="1ch"
              w="1rem"
              h="1rem"
              borderRadius="40%"
              border="1px solid"
              bg={product.color}
            />
          </Text>
          <Text as="h6">
            Storage: {product.storage}Gb / {product.ram}Gb ram
          </Text>
        </VStack>
      </HStack>

      <VStack
        alignItems="end"
        justifyContent="space-between"
        alignSelf="start"
        h="75%"
      >
        <IconButton
          onClick={remove}
          aria-label="delete-from-cart"
          variant="outline"
          color="red"
          icon={<IoBagRemoveOutline />}
        />
        <HStack spacing="3">
          <Select
            placeholder="Quantity"
            w={["4rem", "7rem"]}
            size="sm"
            onChange={onQuantityChange}
            value={quantity}
            name="quantity"
          >
            {Array.from({ length: 7 }, (_, i) => i + 1).map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </Select>

          <Text as="h4" fontWeight="bold">
            ${product.price * product.qty}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default CartProduct;

interface CartItemProps {
  product: CartItem;
}
