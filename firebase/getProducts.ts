import { Smartphone } from "../types";
import { db } from "./config";

export default async function getProducts(name: string): Promise<Smartphone[]> {
  const products: Smartphone[] = [];
  try {
    const productQuery = await db
      .collection("shop")
      .where("brand", "==", name)
      .orderBy("name")
      .get();

    productQuery.forEach((item) =>
      products.push({ ...item.data(), id: item.id } as Smartphone)
    );

    return products;
  } catch (err) {
    console.log(err);
    return err;
  }
}
