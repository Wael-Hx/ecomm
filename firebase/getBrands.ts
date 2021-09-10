import { Brand } from "../types";
import { db } from "./config";

export async function getBrands() {
  const brands: Brand[] = [];

  try {
    const brandsQuery = await db.collection("brands").get();
    brandsQuery.forEach((brand) => {
      brands.push(brand.data() as Brand);
    });
    return brands;
  } catch (err) {
    console.log(err);
    return [];
  }
}
