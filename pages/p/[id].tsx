import { Button, IconButton, Select } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import { VStack, Text, StackProps, Box, HStack } from "@chakra-ui/layout";
import { CartItem, Smartphone } from "../../types";
import { MdAddShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";
import { list, item } from "../../components/fronpage/StoreBrands";
import { OptionIcons } from "../../components/ui/icons";
import Navbar from "../../components/nav/Navbar";
import { BsCircleFill } from "react-icons/bs";
import { FormEvent, ChangeEvent, useState } from "react";
import FormControl from "../../components/ui/form/FormControl";
import getItem from "../../firebase/getItem";
import Head from "next/head";
import { addToCart } from "../../components/cart/cartSlice";
import { useAppDispatch } from "../../redux/hooks";

const MotionDetails = motion<StackProps>(HStack);
const MotionIcon = motion<StackProps>(VStack);

const ProductPage = ({ product }: Product) => {
  const specList: Record<string, string> = {
    resolution: product.specs.resolution,
    cameras: product.specs.cameras,
    OS: product.specs.OS,
    batterie: product.specs.batterie,
    CPU: product.specs.CPU,
    screenSize: product.size + "'",
    storage: product.storage.map((val) => `${val}GB`).join(" | "),
    ram: product.ram.map((val) => `${val}GB`).join(" | "),
  };

  const dispatch = useAppDispatch();

  const [smartphone, setSmartphone] = useState<CartItem>({
    id: product.id,
    name: product.name,
    price: product.price,
    ram: product.ram[0],
    storage: product.storage[0],
    color: product.colors[0],
    specs: product.specs,
    qty: 1,
  });

  const setColor = (color: string) => {
    setSmartphone((currentProduct) => ({
      ...currentProduct,
      color,
    }));
  };
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSmartphone((currentProduct) => ({
      ...currentProduct,
      [e.target.name]: parseInt(e.target.value),
    }));
  };

  const submitToCart = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addToCart({ ...smartphone, image: product.image }));
  };

  return (
    <>
      <Head>
        <title> {product.name} </title>
        <meta name="og:title" content={product.name} />
        <meta name="og:image" content={product.image} />
      </Head>
      <Navbar />
      <VStack w="100%" minH="88vh" spacing="5">
        <HStack
          alignItems="start"
          wrap="wrap"
          w={["100%", "100%", "75%"]}
          spacing="3"
        >
          <Box marginInline={["auto", 0, 0]} p="4" w={["45%", "40%", "30%"]}>
            <Image src={product.image} alt={product.name} />
          </Box>
          <VStack
            p="2"
            alignItems={["center", "center", "start"]}
            w={["100%", "40%"]}
            spacing="5"
          >
            <Text as="h2" textTransform="capitalize">
              {product.name}
            </Text>
            <VStack w="full" as="form" onSubmit={submitToCart}>
              <VStack alignSelf="start" spacing="1" alignItems="start">
                <Text as="h5">Available colors:</Text>
                <HStack spacing="1">
                  {product.colors.map((color) => (
                    <IconButton
                      size={smartphone.color === color ? "md" : "sm"}
                      bg={smartphone.color === color ? color : undefined}
                      outline={
                        smartphone.color === color
                          ? "2px solid silver"
                          : undefined
                      }
                      onClick={() => setColor(color)}
                      type="button"
                      variant="outline"
                      key={color}
                      icon={<BsCircleFill fill={color} />}
                      aria-label={color}
                    />
                  ))}
                </HStack>
              </VStack>
              <FormControl labelTitle="Storage :" id="select-storage">
                <Select
                  onChange={onSelectChange}
                  value={smartphone.storage}
                  name="storage"
                >
                  {product.storage.map((val) => (
                    <option key={val} value={val}>
                      {`${val} Gb`}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl labelTitle="Ram :" id="select-ram">
                <Select
                  onChange={onSelectChange}
                  value={smartphone.ram}
                  name="ram"
                >
                  {product.ram.map((val) => (
                    <option key={val} value={val}>
                      {`${val} Gb`}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <Button type="submit" leftIcon={<MdAddShoppingCart />} w="full">
                ${smartphone.price}
              </Button>
            </VStack>
          </VStack>
        </HStack>

        <MotionDetails
          variants={list}
          initial="hidden"
          animate="visible"
          justifyContent="space-evenly"
          w={["100%", "100%", "90%"]}
          wrap="wrap"
        >
          {Object.keys(specList).map((prop) => (
            <MotionIcon
              spacing="2"
              w="20vmin"
              h="20vmin"
              key={prop}
              variants={item}
              m="3"
            >
              <OptionIcons
                prop={prop}
                os={specList.OS}
                boxSize="10vmin"
                color="blue.300"
                m="2"
              />
              <Text textAlign="center" textTransform="capitalize" as="h6">
                {specList[prop]}
              </Text>
            </MotionIcon>
          ))}
        </MotionDetails>
      </VStack>
    </>
  );
};

export default ProductPage;

interface Product {
  product: Smartphone;
}

interface Params {
  params: { id: string };
}

export async function getServerSideProps({ params }: Params) {
  const { id } = params;
  const product = await getItem(id);
  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}
