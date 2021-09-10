import { useQuery } from "@apollo/client";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Brands from "../components/fronpage/brands/Brands";
import Card from "../components/fronpage/Card";
import Navbar from "../components/nav/Navbar";
import getShopData from "../firebase/getShopData";

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Smartphone Shop</title>
        <meta name="description" content="Smartphone Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Card shop={props.shop} />
      <Brands shop={props.shop} />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const shop = await getShopData();
  return {
    props: {
      shop,
    },
  };
}
