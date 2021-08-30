import { Box, Heading } from "@chakra-ui/react";
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
    margin-left: 2em;
  }
`;
const StoreBrands = () => {
  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="space-evenly"
      h="70%"
      marginTop="12"
    >
      <motion.div
        animate={{ x: 50 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <Heading textTransform="uppercase" as="h1" size="4xl">
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
    </Box>
  );
};

export default StoreBrands;
