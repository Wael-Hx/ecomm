import { Smartphone } from "../types";
import { db } from "./config";

export default async function getItem(id: string): Promise<Smartphone | null> {
  try {
    const productQuery = await db.collection("shop").doc(id).get();
    return {
      ...productQuery.data(),
      id: productQuery.id,
    } as Smartphone;
  } catch (err) {
    console.log(err);
    return null;
  }
}
