import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      h2: {
        fontFamily: "Raleway",
        fontSize: "1.25rem",
        fontWeight: "bold",
      },
      h3: {
        fontFamily: "Raleway",
        fontSize: "1.1rem",
        fontWeight: "bold",
      },
      h4: {
        fontFamily: "Montserrat",
        fontSize: "0.8rem",
        fontWeight: "normal",
      },
      h5: {
        fontFamily: "Raleway",
        fontSize: "0.8rem",
        fontWeight: "normal",
      },
      h6: {
        fontFamily: "Montserrat",
        fontSize: "0.73rem",
        fontWeight: "normal",
      },
    },
  },
});

export default theme;
