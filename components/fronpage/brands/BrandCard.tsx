import { Box, Link, Grid, GridItem, Text } from "@chakra-ui/react";
import { MouseEvent } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Smartphone } from "../../../types";
import { BrandColors, BrandIcon } from "../../ui/icons";
import FeaturedPhone from "./FeaturedPhone";
import NextLink from "next/link";

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
        <BrandIcon
          _hover={{
            transform: "scale(1.1)",
            fill: BrandColors[props.brand],
          }}
          transition="all 0.3s ease-in-out"
          brandName={props.brand}
          boxSize="12vmin"
        />
      </GridItem>
      <GridItem
        colSpan={6}
        rowSpan={1}
        display="flex"
        justifyContent="space-between"
      >
        <Text
          fontSize="clamp(0.8rem, 2.5vmin, 4rem)"
          as="h4"
          fontFamily="Raleway"
          fontWeight="bold"
        >
          Featured from{" "}
          <Box as="span" textTransform="capitalize">
            {props.brand}
          </Box>
        </Text>
        <NextLink href={`/b/${props.brand}`} passHref>
          <Link
            fontStyle="italic"
            fontSize="clamp(0.7rem, 2vmin, 3.6rem)"
            paddingInline="2"
          >
            {"more >"}
          </Link>
        </NextLink>
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
