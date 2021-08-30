import { Button, Grid, GridItem } from "@chakra-ui/react";
import StoreBrands from "./StoreBrands";
import FeaturedCard from "./FeaturedCard";

const Card = () => {
  return (
    <Grid
      as="section"
      margin="auto"
      w={["100%", "90%"]}
      h="100vh"
      templateRows="repeat(5, 1fr)"
      templateColumns="repeat(3, 1fr)"
    >
      <GridItem colSpan={2} rowSpan={4}>
        <StoreBrands />
      </GridItem>
      <GridItem colSpan={1} rowSpan={4}>
        <FeaturedCard />
      </GridItem>
      <GridItem
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
        colSpan={3}
        rowSpan={1}
      >
        <Button mb="1">see more</Button>
      </GridItem>
    </Grid>
  );
};

export default Card;
