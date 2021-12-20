import { Brand, Shop, Smartphone } from "../types";
import app from "./config";
import { collection, query, getFirestore, getDocs, orderBy } from "firebase/firestore";

const db = getFirestore(app);

export default async function getShopData(): Promise<Shop> {
  try {
    const brands: Brand[] = [],
      smartphones: Smartphone[] = [];
    const brandsRef = query(collection(db, "brands"), orderBy("name"));
    const shopRef = query(collection(db, "shop"), orderBy("brand"));

    const [brandsQuery, smartphonesQuery] = await Promise.all([
      getDocs(brandsRef),
      getDocs(shopRef),
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
    return {
      brands: [],
      smartphones: [],
    };
  }
}
