import { Brand } from "../types";
import app from "./config";
import { collection, query, getFirestore, getDocs } from "firebase/firestore";

const db = getFirestore(app);

export async function getBrands() {
  const brands: Brand[] = [];

  try {
    const brandsRef = query(collection(db, "brands"));
    const brandsQuery = await getDocs(brandsRef);
    brandsQuery.forEach((brand) => {
      brands.push(brand.data() as Brand);
    });
    return brands;
  } catch (err) {
    console.log(err);
    return [];
  }
}
