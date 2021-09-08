import { Box, HStack, VStack } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";

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
      <VStack spacing="2">
        <Text as="h4" textTransform="capitalize">
          {props.name}
        </Text>
        <Text as="h4">${props.price} </Text>
      </VStack>
    </HStack>
  );
};

export default FeaturedPhone;

interface FeaturedPhoneProps {
  cover: string;
  name: string;
  price: number;
}
