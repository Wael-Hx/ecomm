import { Heading, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Apple, Samsung, Xiaomi } from "../ui/icons";

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

const heading = {
  visible: { opacity: 1, x: 50 },
  hidden: { opacity: 0, x: 0 },
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
      w={{ base: "100%", md: "65%" }}
      mt={{ base: "1rem", md: "3rem" }}
    >
      <motion.div
        variants={heading}
        initial="hidden"
        animate="visible"
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <Heading
          textTransform="uppercase"
          as="h1"
          fontSize="clamp(2.5rem, 4.5vw, 7rem)"
        >
          Explore our <br /> Deals
        </Heading>
      </motion.div>
      <LogosContainer initial="hidden" animate="visible" variants={list}>
        <motion.div variants={item}>
          <Apple boxSize={{ base: "14", md: "16", lg: "20" }} />
        </motion.div>
        <motion.div variants={item}>
          <Xiaomi boxSize={{ base: "14", md: "16", lg: "20" }} />
        </motion.div>
        <motion.div variants={item}>
          <Samsung boxSize={{ base: "14", md: "16", lg: "20" }} />
        </motion.div>
      </LogosContainer>
    </VStack>
  );
};

export default StoreBrands;
