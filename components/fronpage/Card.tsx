import dynamic from "next/dynamic";
import { Flex } from "@chakra-ui/react";
import StoreBrands from "./StoreBrands";

const FeaturedCard = dynamic(() => import("./FeaturedCard"), { ssr: false });

const Card = () => {
  return (
    <Flex
      wrap="wrap"
      margin="auto"
      as="section"
      w={{ base: "100%", md: "90%" }}
      h="93vh"
    >
      <StoreBrands />
      <FeaturedCard />
    </Flex>
  );
};

export default Card;
