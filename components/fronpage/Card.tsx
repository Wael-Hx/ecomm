import dynamic from "next/dynamic";
import { Flex } from "@chakra-ui/react";
import StoreBrands from "./StoreBrands";
import { Shop } from "../../types";

const FeaturedCard = dynamic(() => import("./featured/FeaturedCard"), {
  ssr: false,
});

const Card = (props: CardProps) => {
  return (
    <Flex
      wrap="wrap"
      margin="auto"
      as="section"
      w={{ base: "100%", md: "90%" }}
      h="93vh"
    >
      <StoreBrands />
      <FeaturedCard smartphones={props.shop.smartphones} />
    </Flex>
  );
};

export default Card;

interface CardProps {
  shop: Shop;
}
