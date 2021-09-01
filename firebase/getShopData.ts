import { Brand, Shop, Smartphone } from "../types";
import { db } from "./config";

export default async function getShopData(): Promise<Shop> {
  try {
    const brands: Brand[] = [],
      smartphones: Smartphone[] = [];

    const [brandsQuery, smartphonesQuery] = await Promise.all([
      db.collection("brands").orderBy("name").get(),
      db.collection("shop").orderBy("brand").get(),
    ]);
    brandsQuery.forEach((brand) => brands.push(brand.data() as Brand));
    smartphonesQuery.forEach((smartphone) =>
      smartphones.push({
        ...(smartphone.data() as Smartphone),
        id: smartphone.id,
      })
    );

    return {
      brands,
      smartphones,
    };
  } catch (err) {
    console.log(err);
    return err;
  }
}
