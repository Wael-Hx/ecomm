import { Shop } from "../../../types";
import BrandCard from "./BrandCard";

const Brands = (props: BrandsProps) => {
  const brands = props.shop.brands,
    smartphones = props.shop.smartphones;

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

interface BrandsProps {
  shop: Shop;
}
