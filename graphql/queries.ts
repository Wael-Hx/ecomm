import { gql, makeVar } from "@apollo/client";
import { Shop } from "../types";

export const GET_SHOP = gql`
  query GetShop {
    getShop {
      brands {
        name
        logo
      }
      smartphones {
        id
        name
        brand
        specs {
          resolution
          cameras
          CPU
          batterie
          OS
        }
        price
        image
        colors
        ram
        storage
        size
      }
    }
  }
`;

export const shop = makeVar<Shop>({
  brands: [],
  smartphones: [],
});
