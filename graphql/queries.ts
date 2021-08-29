import { gql } from "@apollo/client";

export const GET_SHOP = gql`
  query GetShop {
    getShop {
      brands {
        name
        logo
      }
      smartphones {
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
