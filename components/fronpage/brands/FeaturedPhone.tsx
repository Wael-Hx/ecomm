import { Box, HStack, VStack, Button } from "@chakra-ui/react";
import { Image, Text } from "@chakra-ui/react";
import { CgDetailsMore } from "react-icons/cg";
import NextLink from "next/link";

const FeaturedPhone = (props: FeaturedPhoneProps) => {
  return (
    <HStack
      tabIndex={0}
      as="article"
      borderRadius="md"
      minW="33%"
      justifyContent="center"
      h="95%"
      m="auto 8px"
      backgroundColor="#2a2a2a"
    >
      <Box w="45%" p="2">
        <Image
          loading="lazy"
          src={props.cover}
          alt={props.name}
          draggable={false}
        />
      </Box>
      <VStack spacing="3">
        <Text as="h4" textTransform="capitalize">
          {props.name}
        </Text>
        <Text as="h4">${props.price} </Text>
        <NextLink href={`/p/${props.id}`} passHref>
          <Button
            as="a"
            fontFamily="Montserrat"
            fontSize="1.7vmin"
            colorScheme="white"
            fontWeight="normal"
            variant="link"
            cursor="pointer"
            leftIcon={<CgDetailsMore />}
          >
            Details
          </Button>
        </NextLink>
      </VStack>
    </HStack>
  );
};

export default FeaturedPhone;

interface FeaturedPhoneProps {
  cover: string;
  name: string;
  price: number;
  id: string;
}
