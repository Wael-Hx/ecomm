import { useApolloClient } from "@apollo/client";
import { Box, HStack, Image, StackProps, Text, VStack } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { GET_SHOP } from "../../graphql/queries";
import { Shop, Smartphone } from "../../types";

const getItem = (smartphones: Smartphone[]) => {
  const idx = Math.ceil(Math.random() * (smartphones.length - 1));
  return smartphones[idx];
};

const AnimatedCard = motion<StackProps>(VStack);
const card: Variants = {
  visible: {
    opacity: 1,
    x: -30,
    transition: { ease: "easeInOut", duration: 0.5 },
  },
  hidden: { opacity: 0, x: 30 },
};

const FeaturedCard = () => {
  const client = useApolloClient();

  const data = client.readQuery<{ getShop: Shop }>({
    query: GET_SHOP,
  });
  if (!data) {
    return null;
  }

  const phone = getItem(data.getShop.smartphones);

  return (
    <AnimatedCard
      alignItems="start"
      w={{ base: "80%", md: "35%" }}
      spacing="2"
      mt={{ base: "1rem", md: "3rem" }}
      marginInline="auto"
      variants={card}
      initial="hidden"
      animate="visible"
    >
      <HStack spacing="1">
        <HStack w="5ch" h="3ch" bg="black">
          <Text as="h4" p="1" color="white">
            -20%
          </Text>
        </HStack>
        <Text as="h4"> {((phone.price * 80) / 100).toFixed(2)}$ </Text>
      </HStack>
      <Box maxW="67%">
        <Image src={phone.image} alt={phone.name} />
        <Text as="h4"> {phone.name} </Text>
      </Box>
    </AnimatedCard>
  );
};

export default FeaturedCard;
