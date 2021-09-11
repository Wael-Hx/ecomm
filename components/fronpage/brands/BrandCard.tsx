import {
  Box,
  Link,
  Grid,
  GridItem,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { MouseEvent, useState, useRef } from "react";
import { Smartphone } from "../../../types";
import { BrandColors, BrandIcon } from "../../ui/icons";
import FeaturedPhone from "./FeaturedPhone";
import NextLink from "next/link";
import MobileLayout from "./MobileLayout";

const BrandCard = (props: BrandCardProps) => {
  const [mobileLayout] = useMediaQuery("(max-width:767px)");
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
  if (mobileLayout) {
    return (
      <MobileLayout
        topPhones={props.topPhones.slice(0, 3)}
        brand={props.brand}
      />
    );
  }
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
      <NextLink href={`/b/${props.brand}`} passHref>
        <GridItem
          as="a"
          rowSpan={7}
          colSpan={1}
          display="grid"
          placeItems="center"
        >
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
      </NextLink>
      <GridItem
        colSpan={6}
        rowSpan={1}
        display="flex"
        justifyContent="space-between"
      >
        <Text as="h3">
          Featured from{" "}
          <Box as="span" textTransform="capitalize">
            {props.brand}
          </Box>
        </Text>
        <NextLink href={`/b/${props.brand}`} passHref>
          <Link
            fontStyle="italic"
            fontSize="clamp(0.7rem, 2vmin, 1.2rem)"
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
        borderRadius="md"
        colSpan={6}
        rowSpan={6}
        overflowX="auto"
        display="flex"
        css={{
          scrollbarWidth: "thin",
        }}
        userSelect="none"
      >
        {props.topPhones.map((phone) => (
          <FeaturedPhone
            id={phone.id}
            cover={phone.image}
            name={phone.name}
            price={phone.price}
            key={phone.id}
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
