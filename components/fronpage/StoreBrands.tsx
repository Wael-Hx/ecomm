import { Heading, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Apple, Samsung, Xiaomi } from "./Icons";

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.35,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const item = {
  visible: { opacity: 1, x: 20 },
  hidden: { opacity: 0, x: -100 },
};

const LogosContainer = styled(motion.div)`
  width: 100%;
  display: flex;

  & > * {
    margin-left: 1.5rem;
  }
`;
const StoreBrands = () => {
  return (
    <VStack
      alignItems="start"
      spacing="4"
      w={["100%", "100%", "100%", "65%"]}
      h={["30%", "30%", "30%", "70%"]}
      mt={["2rem", "2rem", "3rem"]}
    >
      <motion.div
        animate={{ x: 50 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <Heading
          textTransform="uppercase"
          as="h1"
          fontSize={["3xl", "4xl", "5xl", "7xl"]}
        >
          Explore our <br /> Deals
        </Heading>
      </motion.div>
      <LogosContainer initial="hidden" animate="visible" variants={list}>
        <motion.div variants={item}>
          <Apple boxSize="20" />
        </motion.div>
        <motion.div variants={item}>
          <Xiaomi boxSize="20" />
        </motion.div>
        <motion.div variants={item}>
          <Samsung boxSize="20" />
        </motion.div>
      </LogosContainer>
    </VStack>
  );
};

export default StoreBrands;
