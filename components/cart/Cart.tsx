import { Grid, HStack, VStack, Text, Box, Button } from "@chakra-ui/react";
import { Cart } from "../../types";
import CartItem from "./CartItem";
import { IoBagCheckOutline } from "react-icons/io5";
import { MasterCard, Visa } from "../ui/icons";

const UserCart = (props: Cart) => {
  return (
    <>
      <Grid
        h="60%"
        overflowX="auto"
        css={{
          scrollbarWidth: "thin",
          scrollBehavior: "smooth",
        }}
        templateColumns="1fr"
        autoRows="minmax(10rem , 20%)"
        borderBottom="1px solid silver"
      >
        {props.products.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
      </Grid>
      <HStack justifyContent={["center", "end"]} mt="2" p="1.5" w="90%">
        <VStack
          w={{
            sm: "90%",
            lg: "40%",
          }}
          spacing="3"
        >
          <Text
            as="h4"
            w="full"
            fontWeight="semibold"
            display="flex"
            justifyContent="space-between"
          >
            <span> Total</span> <span> ${props.total.toFixed(2)} </span>
          </Text>
          <Text as="h6">
            <em>shipping and taxed will be calculated at chekout </em>
          </Text>
          <Button
            color="white"
            bg="linear-gradient(90deg,#5082e4,#52bcf8)"
            _hover={{
              background: "linear-gradient(90deg,#4174db,#2fb2fd)",
            }}
            _active={{
              background: "linear-gradient(90deg,#4174db,#2fb2fd)",
            }}
            w="full"
            fontFamily="Montserrat"
            rightIcon={<IoBagCheckOutline />}
          >
            Checkout
          </Button>
          <Box as="hr" w="full" borderTop="1px solid silver" />
          <HStack spacing="4">
            <Visa boxSize="10" />
            <MasterCard boxSize="10" />
          </HStack>
        </VStack>
      </HStack>
    </>
  );
};

export default UserCart;
