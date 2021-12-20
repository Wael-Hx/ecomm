import { Smartphone } from "../types";
import app from "./config";
import { collection, query, getFirestore, getDocs, where } from "firebase/firestore";

const db = getFirestore(app);

export default async function getProducts(name: string): Promise<Smartphone[]> {
  const products: Smartphone[] = [];
  try {
    const ProductsRef = query(collection(db, "shop"), where("brand", "==", name));

    const productQuery = await getDocs(ProductsRef);

    productQuery.forEach((item) =>
      products.push({ ...item.data(), id: item.id } as Smartphone)
    );

    return products;
  } catch (err) {
    console.log(err);
    return [];
  }
}
