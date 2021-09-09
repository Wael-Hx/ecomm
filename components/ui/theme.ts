import { extendTheme, Theme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme<Theme>({
  config,
  styles: {
    global: {
      h2: {
        fontFamily: "Raleway",
        fontSize: "clamp(1.2rem ,2.6vmin,4rem )",
        fontWeight: "bold",
      },
      h3: {
        fontSize: "clamp(0.8rem, 2.5vmin, 4rem)",
        fontWeight: "bold",
        fontFamily: "Raleway",
      },
      h4: {
        fontFamily: "Montserrat",
        fontSize: "clamp(0.6rem , 0.9vmax , 1.2vmax)",
        fontWeight: "normal",
      },
      h5: {
        fontFamily: "Raleway",
        fontSize: "clamp(0.6rem , 0.9vmax , 1.2vmax)",
        fontWeight: "normal",
      },
      h6: {
        fontFamily: "Montserrat",
        fontSize: "clamp(0.6rem , 0.75vmax , 1.1vmax)",
        fontWeight: "normal",
      },
    },
  },
});

export default theme;
