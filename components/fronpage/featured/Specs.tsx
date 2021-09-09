import { Stack, StackProps, Text } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { Spec } from "../../../types";
import { OptionIcons } from "../../ui/icons";

const listcontainer: Variants = {
  hover: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
    opacity: 1,
    x: "100%",
  },
  idle: {
    transition: {
      when: "afterChildren",
    },
    opacity: 0,
    x: "115%",
  },
};

const item: Variants = {
  hover: {
    opacity: 1,
  },
  idle: {
    opacity: 0,
  },
};

const MotionContainer = motion<StackProps>(Stack);

const Specs = (props: SpecProps) => {
  const optionsData: Record<string, string> = {
    batterie: props.options.batterie,
    cameras: props.options.cameras,
    ram: props.ram[0] + "Gb RAM",
    screenSize: props.screenSize + "'",
  };
  return (
    <MotionContainer
      direction="column"
      spacing="2"
      position="absolute"
      top="0"
      right="0"
      variants={listcontainer}
    >
      {Object.keys(optionsData).map((prop) => (
        <MotionContainer
          pl="1"
          direction="row"
          alignItems="center"
          spacing="2"
          key={prop}
          variants={item}
        >
          <OptionIcons
            color="#2a2a2a"
            boxSize="4vmin"
            os={optionsData.OS}
            prop={prop}
          />
          <Text as="h4">{optionsData[prop]}</Text>
        </MotionContainer>
      ))}
    </MotionContainer>
  );
};

export default Specs;

interface SpecProps {
  options: Spec;
  screenSize: number;
  ram: number[];
  storage: number[];
}
