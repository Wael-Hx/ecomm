import {
  Grid,
  GridItem,
  HStack,
  Button,
  VStack,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { CgDetailsMore } from "react-icons/cg";
import { MdAddShoppingCart } from "react-icons/md";
import Navbar from "../../components/nav/Navbar";
import { initializeApollo } from "../../graphql/client";
import { GET_ITEMS } from "../../graphql/queries";
import { Smartphone } from "../../types";

const Filters = dynamic(() => import("../../components/brandPage/Filters"), {
  ssr: false,
});

const Name = (props: BrandProducts) => {
  return (
    <>
      <Navbar />

      <Grid
        pos="relative"
        as="main"
        w={["100%", "90%"]}
        m="2rem auto"
        minH="70vh"
        p="1"
        templateRows="1fr"
        templateColumns="repeat(10, 1fr)"
        gap={4}
      >
        <GridItem colSpan={2} rowSpan={1}>
          <Filters name={props.brand} />
        </GridItem>

        <GridItem colSpan={8} rowSpan={1}>
          <Grid
            as="section"
            w="100%"
            h="100%"
            gap="4"
            autoRows="50vmin"
            templateColumns="repeat(3,1fr)"
          >
            {props.products.map((phone) => (
              <VStack
                key={phone.id}
                as="article"
                w="100%"
                h="100%"
                bg="gray.100"
                borderRadius="md"
                p="3"
                justifyContent="space-evenly"
              >
                <Box w="40%" css={{ aspectRatio: "9/12" }}>
                  <Image src={phone.image} alt={phone.name} />
                </Box>

                <Text
                  fontFamily="Raleway"
                  as="h4"
                  fontSize="0.87rem"
                  fontWeight="normal"
                  textTransform="capitalize"
                >
                  {phone.name}
                </Text>
                <Text as="h4" fontSize="0.87rem" fontWeight="normal">
                  from ${phone.price}
                </Text>
                <HStack spacing="2">
                  <Button variant="outline" leftIcon={<MdAddShoppingCart />}>
                    Add
                  </Button>
                  <Button variant="outline" leftIcon={<CgDetailsMore />}>
                    Details
                  </Button>
                </HStack>
              </VStack>
            ))}
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
};

export default Name;

interface BrandProducts {
  products: Smartphone[];
  brand: string;
}

interface Params {
  params: { name: string };
}

export async function getServerSideProps({ params }: Params) {
  const { name } = params;
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<{ getItems: Smartphone[] }>({
    query: GET_ITEMS,
    variables: {
      name,
    },
  });

  return {
    props: {
      products: data.getItems,
      brand: name,
    },
  };
}
