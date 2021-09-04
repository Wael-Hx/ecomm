import { useApolloClient } from "@apollo/client";
import {
  Box,
  BoxProps,
  HStack,
  Image,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { GET_SHOP } from "../../../graphql/queries";
import { Shop, Smartphone } from "../../../types";
import Specs from "./Specs";

const getItem = (smartphones: Smartphone[]) => {
  const idx = Math.ceil(Math.random() * (smartphones.length - 1));
  return smartphones[idx];
};

const AnimatedCard = motion<StackProps>(VStack);
const MotionBox = motion<BoxProps>(Box);

const card: Variants = {
  visible: {
    opacity: 1,
    x: -30,
    transition: { ease: "easeInOut", duration: 1 },
  },
  hidden: { opacity: 0, x: 30 },
};

const imageAnimation: Variants = {
  hover: {
    scale: 0.9,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
  idle: {
    scale: 1,
  },
};

const name: Variants = {
  hover: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  idle: {
    opacity: 0,
  },
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
      fontFamily="Montserrat"
      fontSize=".87rem"
      alignItems="start"
      w={{ base: "80%", md: "35%" }}
      spacing="2"
      mt={{ base: "1rem", md: "3rem" }}
      marginInline="auto"
      variants={card}
      initial="hidden"
      animate="visible"
      h="65%"
    >
      <HStack fontWeight="light" spacing="1">
        <HStack w="5ch" h="3ch" bg="black">
          <Text as="h4" p="1" color="white">
            -20%
          </Text>
        </HStack>
        <Text as="h4"> {((phone.price * 80) / 100).toFixed(2)}$ </Text>
      </HStack>
      <MotionBox
        background="url(/loading.svg) center no-repeat"
        backgroundSize="25% 25%"
        maxW="67%"
        w="67%"
        css={{ aspectRatio: "9/12" }}
        pos="relative"
        initial="idle"
        whileHover="hover"
        whileFocus="hover"
        whileTap="hover"
        variants={imageAnimation}
      >
        <Image src={phone.image} alt={phone.name} />
        <Specs
          options={phone.specs}
          ram={phone.ram}
          storage={phone.storage}
          screenSize={phone.size}
        />
        <MotionBox
          pos="absolute"
          top="-7%"
          left="-5%"
          variants={name}
          as="h4"
          fontWeight="medium"
          textTransform="uppercase"
        >
          {phone.name}
        </MotionBox>
      </MotionBox>
    </AnimatedCard>
  );
};

export default FeaturedCard;
