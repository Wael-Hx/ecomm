import { Smartphone } from "../types";
import app from "./config";
import { doc, getFirestore, getDoc } from "firebase/firestore";

const db = getFirestore(app);

export default async function getItem(id: string): Promise<Smartphone | null> {
  try {
    const productRef = doc(db, "shop", id);
    const productQuery = await getDoc(productRef);
    return {
      ...productQuery.data(),
      id: productQuery.id,
    } as Smartphone;
  } catch (err) {
    console.log(err);
    return null;
  }
}
