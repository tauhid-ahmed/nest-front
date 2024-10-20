import { createTheme } from "@mui/material/styles";

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    highlighted: true;
  }
}
declare module "@mui/material/styles/createPalette" {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}
}

export const grey = {
  50: "#f9f9f9",
  100: "#f0f0f0",
  200: "#e0e0e0",
  300: "#d0d0d0",
  400: "#b3b3b3",
  500: "#7d7d7d",
  600: "#595959",
  700: "#4f4f4f",
  800: "#3d3d3d",
  900: "#1a1a1a",
};

const defaultTheme = createTheme();

// const customShadows: Shadows = [...defaultTheme.shadows];

export const getDesignTokens = () => {
  return {
    palette: {
      primary: {
        main: "#41872d",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#ffc700",
      },
      error: {
        main: "#d32f2f",
      },
      success: {
        main: "#4caf50",
      },
      // accent: {
      //   main: "#1a1a1a",
      //   contrastText: "#fff",
      // },
      text: {
        primary: "#1a1a1a",
        secondary: "#595959",
        disabled: "#b3b3b3",
        hint: "#707070",
      },
      background: {
        default: "#ffffff",
        paper: "#f8f8f8",
        button: "#1a1a1a",
      },
      divider: "#e0e0e0",
      action: {
        hover: "#008f5a",
        disabledBackground: "#e0e0e0",
      },
    },
    typography: {
      fontFamily: ['"Roboto", "sans-serif"'].join(","),
      h1: {
        fontSize: defaultTheme.typography.pxToRem(48),
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: -0.5,
      },
      h2: {
        fontSize: defaultTheme.typography.pxToRem(36),
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: defaultTheme.typography.pxToRem(30),
        fontWeight: 400,
        lineHeight: 1.2,
      },
      h4: {
        fontSize: defaultTheme.typography.pxToRem(24),
        fontWeight: 400,
        lineHeight: 1.5,
      },
      h5: {
        fontSize: defaultTheme.typography.pxToRem(20),
        fontWeight: 400,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 400,
        lineHeight: 1.4,
      },
      subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 400,
        lineHeight: 1.5,
      },
      subtitle2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: defaultTheme.typography.pxToRem(16),
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 400,
        lineHeight: 1.5,
      },
      caption: {
        fontSize: defaultTheme.typography.pxToRem(12),
        fontWeight: 400,
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 8,
    },

    // shadows: customShadows,
  };
};
