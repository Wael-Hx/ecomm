import { Box, Grid, GridItem, Text, VStack } from "@chakra-ui/layout";
import NextLink from "next/link";
import { BrandColors, BrandIcon } from "../../ui/icons";
import { Smartphone } from "../../../types";
import { Image } from "@chakra-ui/image";

const MobileLayout = (props: Props) => {
  return (
    <Grid
      m="2rem auto"
      h={["25rem", "35rem"]}
      w="95%"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(2, 1fr)"
      gap={2}
      p="2"
      bg="black"
      borderRadius="md"
      border="1px solid silver"
    >
      <NextLink href={`/b/${props.brand}`} passHref>
        <GridItem
          bg="white"
          as="a"
          rowSpan={1}
          colSpan={1}
          display="grid"
          placeItems="center"
        >
          <BrandIcon
            fill={BrandColors[props.brand]}
            transition="all 0.3s ease-in-out"
            brandName={props.brand}
            boxSize="12vmin"
          />
        </GridItem>
      </NextLink>
      {props.topPhones.map((phone) => (
        <NextLink key={phone.id} href={`/p/${phone.id}`} passHref>
          <GridItem
            borderRadius="md"
            backgroundColor="#2a2a2a"
            as="a"
            colSpan={1}
            rowSpan={1}
          >
            <VStack spacing="1" p="1.5">
              <Box h="80%" w="50%">
                <Image src={phone.image} alt={phone.name} />
              </Box>
              <Text color="white" as="h6" textTransform="capitalize">
                {phone.name}
              </Text>
              <Text color="white" as="h6" textTransform="capitalize">
                ${phone.price}
              </Text>
            </VStack>
          </GridItem>
        </NextLink>
      ))}
    </Grid>
  );
};

export default MobileLayout;

interface Props {
  brand: string;
  topPhones: Smartphone[];
}
