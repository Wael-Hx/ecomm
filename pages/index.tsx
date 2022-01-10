import { InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Footer from "../components/footer/Footer";
import Card from "../components/fronpage/Card";
import Navbar from "../components/nav/Navbar";
import getShopData from "../firebase/getShopData";

const Brands = dynamic(() => import("../components/fronpage/brands/Brands"), {
  ssr: false,
});

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Smartphone Shop</title>
        <meta name="description" content="Smartphone Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar smartphones={props.shop.smartphones} />
      <Card shop={props.shop} />
      <Brands shop={props.shop} />
      <Footer />
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
