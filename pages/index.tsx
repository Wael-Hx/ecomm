import { useQuery } from "@apollo/client";
import Head from "next/head";
import Brands from "../components/fronpage/brands/Brands";
import Card from "../components/fronpage/Card";
import Navbar from "../components/nav/Navbar";
import { initializeApollo } from "../graphql/client";
import { GET_SHOP } from "../graphql/queries";
import { Shop } from "../types";

const Home = () => {
  useQuery(GET_SHOP);

  return (
    <>
      <Head>
        <title>Smartphone Shop</title>
        <meta name="description" content="Smartphone Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Card />
      <Brands />
    </>
  );
};

export default Home;
export async function getStaticProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query<{ getShop: Shop }>({
    query: GET_SHOP,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
