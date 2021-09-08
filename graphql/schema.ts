import { gql } from "apollo-server-micro";
import { makeExecutableSchema } from "@graphql-tools/schema";
import getShopData from "../firebase/getShopData";
import getProducts from "../firebase/getProducts";

export const typeDefs = gql`
  type Brand {
    name: String
    logo: String
  }
  type Spec {
    resolution: String
    cameras: String
    OS: String
    batterie: String
    CPU: String
  }
  type Smartphone {
    id: String
    name: String
    brand: String
    specs: Spec
    price: Float
    image: String
    colors: [String]
    ram: [Int]
    storage: [Int]
    size: Float
  }
  type Shop {
    brands: [Brand]
    smartphones: [Smartphone]
  }

  type Query {
    getShop: Shop
    getItems(name: String!): [Smartphone]
  }
`;

export const resolvers = {
  Query: {
    async getShop() {
      const data = await getShopData();
      return data;
    },
    async getItems(_: any, { name }: { name: string }) {
      const items = await getProducts(name);
      return items;
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
