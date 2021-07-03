import { extendTheme } from "@chakra-ui/react";

/*
 自定义 theme
 default theme: https://chakra-ui.com/docs/theming/theme

*/

// foundations
// https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src/foundations
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const fonts = {
  body: `-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif`,
  heading: `-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif`,
};

// global styles
const styles = {
  global: {
    body: {
      fontFamily: "body",
    },
  },
};

// component styles
// https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src/components
/*
    组成
    const ComponentStyle = {
    // style object for base or default style
    baseStyle: {},
    // styles for different sizes ("sm", "md", "lg")
    sizes: {},
    // styles for different visual variants ("outline", "solid")
    variants: {},
    // default values for `size` and `variant`
    defaultProps: {
        size: "",
        variant: "",
    },
    };
*/
const components = {
  Button: {},
};

const overrides = {
  colors,
  fonts,
  styles,
  components,
};

const theme = extendTheme(overrides);

export default theme;
