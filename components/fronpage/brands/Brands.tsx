import { useApolloClient } from "@apollo/client";
import { GET_SHOP } from "../../../graphql/queries";
import { Shop } from "../../../types";
import BrandCard from "./BrandCard";

const Brands = () => {
  const client = useApolloClient();
  const data = client.readQuery<{ getShop: Shop }>({
    query: GET_SHOP,
  });
  if (!data) {
    return null;
  }
  const brands = data.getShop.brands,
    smartphones = data.getShop.smartphones;

  return (
    <>
      {brands.map((brand) => {
        const topPhones = smartphones
          .filter((phone) => phone.brand === brand.name)
          .slice(0, 4);
        return (
          <BrandCard
            topPhones={topPhones}
            brand={brand.name}
            key={brand.name}
          />
        );
      })}
    </>
  );
};

export default Brands;
