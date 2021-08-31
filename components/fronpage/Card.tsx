import { Button, Flex, Grid } from "@chakra-ui/react";
import StoreBrands from "./StoreBrands";
import FeaturedCard from "./FeaturedCard";

const Card = () => {
  return (
    <Flex
      as="section"
      margin="auto"
      direction="column"
      w={["100%", "100%", "90%"]}
      h="93vh"
      justifyContent="space-between"
    >
      <Flex wrap="wrap" w="100%" h="93%" justifyContent="space-around">
        <StoreBrands />
        <FeaturedCard />
      </Flex>

      <Grid w="100%" placeItems="center">
        <Button mb="1">see more</Button>
      </Grid>
    </Flex>
  );
};

export default Card;
