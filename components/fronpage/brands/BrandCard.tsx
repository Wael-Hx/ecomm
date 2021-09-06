import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { MouseEvent } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Smartphone } from "../../../types";
import { BrandIcon } from "../../ui/icons";
import FeaturedPhone from "./FeaturedPhone";

const BrandCard = (props: BrandCardProps) => {
  const [drag, setDrag] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null),
    mouseDownPos = useRef(0),
    scrollPos = useRef(0);

  const mouseDownHandler = (e: MouseEvent) => {
    setDrag(true);
    mouseDownPos.current = e.clientX;
    if (cardContainerRef.current)
      scrollPos.current = cardContainerRef.current.scrollLeft;
  };
  const mouseMoveHandler = (e: MouseEvent) => {
    const offset = e.clientX - mouseDownPos.current;
    if (cardContainerRef.current && drag)
      cardContainerRef.current.scrollLeft = scrollPos.current - offset;
  };
  const mouseUpHandler = () => {
    setDrag(false);
  };
  return (
    <Grid
      m="2rem 0 2rem 5% "
      w="83%"
      h="20vw"
      templateRows="repeat(7, 1fr)"
      templateColumns="repeat(7, 1fr)"
      gap={2}
      as="section"
    >
      <GridItem rowSpan={7} colSpan={1} display="grid" placeItems="center">
        <BrandIcon brandName={props.brand} boxSize="12vmin" />
      </GridItem>
      <GridItem colSpan={6} rowSpan={1}>
        <Text
          fontSize="clamp(0.8rem, 1.3vw, 4rem)"
          as="h4"
          fontFamily="Raleway"
          fontWeight="bold"
        >
          Featured from{" "}
          <Box as="span" textTransform="capitalize">
            {props.brand}
          </Box>
        </Text>
      </GridItem>
      <GridItem
        tabIndex={0}
        ref={cardContainerRef}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler}
        color="white"
        p="1.5"
        bg="black"
        fontFamily="Montserrat"
        fontSize="1.7vmin"
        borderRadius="md"
        colSpan={6}
        rowSpan={6}
        overflowX="auto"
        display="flex"
        css={{
          scrollbarWidth: "none",
        }}
        userSelect="none"
      >
        {props.topPhones.map((phone) => (
          <FeaturedPhone
            cover={phone.image}
            name={phone.name}
            price={phone.price}
            key={phone.name}
          />
        ))}
      </GridItem>
    </Grid>
  );
};

export default BrandCard;

interface BrandCardProps {
  topPhones: Smartphone[];
  brand: string;
}
