import Head from "next/head";
import Navbar from "../components/nav/Navbar";

const Home = () => {
  return (
    <>
      <Head>
        <title>Smartphone Shop</title>
        <meta name="description" content="Smartphone Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>main content</main>
    </>
  );
};

export default Home;
