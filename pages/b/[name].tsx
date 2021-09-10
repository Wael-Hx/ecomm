import {
  Flex,
  HStack,
  Button,
  VStack,
  Text,
  Image,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useMediaQuery } from "@chakra-ui/media-query";
import dynamic from "next/dynamic";
import { CgDetailsMore } from "react-icons/cg";
import { MdAddShoppingCart } from "react-icons/md";
import Navbar from "../../components/nav/Navbar";
import { FilterOptions, Smartphone } from "../../types";
import NextLink from "next/link";
import { useRef, useMemo } from "react";
import Drawer from "../../components/ui/drawer/Drawer";
import { BsFilter } from "react-icons/bs";
import getProducts from "../../firebase/getProducts";
import { getBrands } from "../../firebase/getBrands";
import { useAppSelector } from "../../redux/hooks";

const Filters = dynamic(() => import("../../components/brandPage/Filters"), {
  ssr: false,
});

const createFilter = (filters: FilterOptions, item: Smartphone) => {
  if (!filters || Object.keys(filters).length === 0) {
    return item;
  } else {
    return Object.keys(filters).every((p) => {
      switch (p) {
        case "price":
          if (filters.price === 100) {
            return item[p];
          }
          return item[p] <= filters[p];
        case "ram":
          return item[p][item[p].length - 1] >= filters[p];
        case "storage":
          return item[p][item[p].length - 1] >= filters[p];
        case "size":
          return item[p] >= filters[p];
        default:
          break;
      }
    });
  }
};

const Name = (props: BrandProducts) => {
  const [verticalLayout] = useMediaQuery("(max-width:970px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const filters = useAppSelector((state) => state.filters);

  const smartphones = useMemo(
    () => props.products.filter((phone) => createFilter(filters, phone)),
    [filters, props.products]
  );

  return (
    <>
      <Navbar />
      <HStack
        pos="relative"
        as="main"
        w={verticalLayout ? "100%" : "90%"}
        m="2rem auto"
        minH="70vh"
        p="1"
        wrap="wrap"
        spacing="2"
        alignItems="start"
      >
        {verticalLayout ? (
          <>
            <IconButton
              onClick={onOpen}
              ref={btnRef}
              aria-label="filters"
              p="3"
              variant="outline"
              pos="fixed"
              bottom="2%"
              right="2%"
              size="lg"
              bg="white"
              boxShadow="md"
              icon={<BsFilter />}
            />
            <Drawer
              drawerTitle="Filters"
              isOpen={isOpen}
              placement="left"
              size="md"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <Box w="90%" p="3" marginInline="auto">
                <Filters name={props.brand} />
              </Box>
            </Drawer>
          </>
        ) : (
          <Box pos="sticky" top="0" w="23%">
            <Filters name={props.brand} />
          </Box>
        )}

        <Flex
          w={verticalLayout ? "100%" : "75%"}
          justifyContent={verticalLayout ? "center" : "start"}
          wrap="wrap"
        >
          {smartphones.length === 0 && (
            <VStack w="90%">
              <Text as="h2">No Smartphone matches your filters</Text>
            </VStack>
          )}
          {smartphones.map((phone) => (
            <VStack
              key={phone.id}
              as="article"
              w="32%"
              minW="20rem"
              bg="gray.100"
              borderRadius="md"
              p="2"
              m="1.5"
              justifyContent="space-evenly"
            >
              <Box w="40%" css={{ aspectRatio: "9/12" }}>
                <Image src={phone.image} alt={phone.name} />
              </Box>

              <Text as="h5" textTransform="capitalize">
                {phone.name}
              </Text>
              <Text as="h4" fontWeight="normal">
                from ${phone.price}
              </Text>
              <HStack spacing="2">
                <Button
                  fontSize="clamp(0.7rem, 2vmin, 3.6rem)"
                  variant="outline"
                  leftIcon={<MdAddShoppingCart />}
                >
                  Add
                </Button>
                <NextLink href={`/p/${phone.id}`}>
                  <Button
                    fontSize="clamp(0.7rem, 2vmin, 3.6rem)"
                    as="a"
                    variant="outline"
                    cursor="pointer"
                    leftIcon={<CgDetailsMore />}
                  >
                    Details
                  </Button>
                </NextLink>
              </HStack>
            </VStack>
          ))}
        </Flex>
      </HStack>
    </>
  );
};

export default Name;

interface BrandProducts {
  products: Smartphone[];
  brand: string;
}

interface Params {
  params: { name: string };
}

export async function getStaticProps({ params }: Params) {
  const { name } = params;

  const data = await getProducts(name);

  return {
    props: {
      products: data,
      brand: name,
    },
  };
}

export async function getStaticPaths() {
  const brands = await getBrands();

  return {
    paths: brands.map((brand) => ({
      params: {
        name: brand.name,
      },
    })),
    fallback: false,
  };
}
