import { alpha, Theme, Components } from "@mui/material/styles";
import { grey as gray } from "../themePrimitives";
// import { svgIconClasses } from "@mui/material";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}

declare module "@mui/material" {
  interface ButtonPropsSizeOverrides {
    small: true;
    medium: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["grey"];
  }
  interface PaletteOptions {
    accent?: PaletteOptions["grey"];
  }
}

export const inputsCustomizations: Components<Theme> = {
  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: ({}) => ({
        boxSizing: "border-box",
        transition: "all 100ms ease-in",
        "&:focus-visible": {
          outline: `3px solid currentColor`,
          outlineOffset: "1px",
        },
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: "none",
        borderRadius: 24,
        textTransform: "none",
        whiteSpace: "nowrap",

        variants: [
          {
            props: {
              size: "small",
            },
            style: {
              height: "2.25rem",
              padding: "8px 12px",
            },
          },
          {
            props: {
              size: "medium",
            },
            style: {
              height: "2.5rem",
            },
          },
          {
            props: {
              color: "primary",
              variant: "contained",
            },
            style: {
              color: "primary.contrastText",
              backgroundColor: "primary.main",

              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.9),
              },
              "&:active": {
                backgroundColor: alpha(theme.palette.primary.main, 0.9),
              },
            },
          },
          {
            props: {
              color: "accent",
              variant: "contained",
            },
            style: {
              color: "#fff",
              backgroundColor: gray[900],

              "&:hover": {
                backgroundColor: gray[800],
              },
              "&:active": {
                backgroundColor: gray[800],
              },
            },
          },
          {
            props: {
              color: "accent",
              variant: "outlined",
            },
            style: {
              color: gray[900],
              border: `1px solid ${gray[900]}`,

              "&:hover": {
                opacity: 0.7,
              },
              "&:active": {
                opacity: 0.7,
              },
            },
          },
          {
            props: {
              color: "accent",
              variant: "text",
            },
            style: {
              color: gray[900],

              "&:hover": {
                opacity: 0.7,
              },
              "&:active": {
                opacity: 0.7,
              },
            },
          },
        ],
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: "none",
        borderRadius: theme.shape.borderRadius,
        textTransform: "none",
        fontWeight: theme.typography.fontWeightMedium,
        letterSpacing: 0,
        // color: "transparent",
        // border: "1px solid ",
        // borderColor: gray[200],
        backgroundColor: "transparent",
        "&:hover": {
          // backgroundColor: gray[100],
          borderColor: gray[300],
        },
        "&:active": {
          // backgroundColor: gray[200],
        },
        variants: [
          {
            props: {
              size: "small",
            },
            style: {
              width: "1.5rem",
              height: "1.5rem",
              // [`& .${svgIconClasses.root}`]: { fontSize: "1rem" },
            },
          },
          {
            props: {
              size: "medium",
            },
            style: {
              width: "1.5rem",
              height: "1.5rem",
            },
          },
        ],
      }),
    },
  },
  // MuiToggleButtonGroup: {
  //   styleOverrides: {
  //     root: ({ theme }) => ({
  //       borderRadius: "10px",
  //       boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
  //       [`& .${toggleButtonGroupClasses.selected}`]: {
  //         color: brand[500],
  //       },
  //       ...theme.applyStyles("dark", {
  //         [`& .${toggleButtonGroupClasses.selected}`]: {
  //           color: "#fff",
  //         },
  //         boxShadow: `0 4px 16px ${alpha(brand[700], 0.5)}`,
  //       }),
  //     }),
  //   },
  // },
  // MuiToggleButton: {
  //   styleOverrides: {
  //     root: ({ theme }) => ({
  //       padding: "12px 16px",
  //       textTransform: "none",
  //       borderRadius: "10px",
  //       fontWeight: 500,
  //       ...theme.applyStyles("dark", {
  //         color: gray[400],
  //         boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
  //         [`&.${toggleButtonClasses.selected}`]: {
  //           color: brand[300],
  //         },
  //       }),
  //     }),
  //   },
  // },
  // MuiCheckbox: {
  //   defaultProps: {
  //     disableRipple: true,
  //     icon: <CheckBoxOutlineBlankRoundedIcon sx={{ color: "hsla(210, 0%, 0%, 0.0)" }} />,
  //     checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
  //     indeterminateIcon: <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />,
  //   },
  //   styleOverrides: {
  //     root: ({ theme }) => ({
  //       margin: 10,
  //       height: 16,
  //       width: 16,
  //       borderRadius: 5,
  //       border: "1px solid ",
  //       borderColor: alpha(gray[300], 0.8),
  //       boxShadow: "0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset",
  //       backgroundColor: alpha(gray[100], 0.4),
  //       transition: "border-color, background-color, 120ms ease-in",
  //       "&:hover": {
  //         borderColor: brand[300],
  //       },
  //       "&.Mui-focusVisible": {
  //         outline: `3px solid ${alpha(brand[500], 0.5)}`,
  //         outlineOffset: "2px",
  //         borderColor: brand[400],
  //       },
  //       "&.Mui-checked": {
  //         color: "white",
  //         backgroundColor: brand[500],
  //         borderColor: brand[500],
  //         boxShadow: `none`,
  //         "&:hover": {
  //           backgroundColor: brand[600],
  //         },
  //       },
  //       ...theme.applyStyles("dark", {
  //         borderColor: alpha(gray[700], 0.8),
  //         boxShadow: "0 0 0 1.5px hsl(210, 0%, 0%) inset",
  //         backgroundColor: alpha(gray[900], 0.8),
  //         "&:hover": {
  //           borderColor: brand[300],
  //         },
  //         "&.Mui-focusVisible": {
  //           borderColor: brand[400],
  //           outline: `3px solid ${alpha(brand[500], 0.5)}`,
  //           outlineOffset: "2px",
  //         },
  //       }),
  //     }),
  //   },
  // },
  // MuiInputBase: {
  //   styleOverrides: {
  //     root: {
  //       border: "none",
  //     },
  //     input: {
  //       "&::placeholder": {
  //         opacity: 0.7,
  //         color: gray[500],
  //       },
  //     },
  //   },
  // },
  // MuiOutlinedInput: {
  //   styleOverrides: {
  //     input: {
  //       padding: 0,
  //     },
  //     root: ({ theme }) => ({
  //       padding: "8px 12px",
  //       color: theme.palette.text.primary,
  //       borderRadius: theme.shape.borderRadius,
  //       border: `1px solid ${theme.palette.divider}`,
  //       backgroundColor: theme.palette.background.default,
  //       transition: "border 120ms ease-in",
  //       "&:hover": {
  //         borderColor: gray[400],
  //       },
  //       [`&.${outlinedInputClasses.focused}`]: {
  //         outline: `3px solid ${alpha(brand[500], 0.5)}`,
  //         borderColor: brand[400],
  //       },
  //       ...theme.applyStyles("dark", {
  //         "&:hover": {
  //           borderColor: gray[500],
  //         },
  //       }),
  //       variants: [
  //         {
  //           props: {
  //             size: "small",
  //           },
  //           style: {
  //             height: "2.25rem",
  //           },
  //         },
  //         {
  //           props: {
  //             size: "medium",
  //           },
  //           style: {
  //             height: "2.5rem",
  //           },
  //         },
  //       ],
  //     }),
  //     notchedOutline: {
  //       border: "none",
  //     },
  //   },
  // },
  // MuiInputAdornment: {
  //   styleOverrides: {
  //     root: ({ theme }) => ({
  //       color: theme.palette.grey[500],
  //       ...theme.applyStyles("dark", {
  //         color: theme.palette.grey[400],
  //       }),
  //     }),
  //   },
  // },
  // MuiFormLabel: {
  //   styleOverrides: {
  //     root: ({ theme }) => ({
  //       typography: theme.typography.caption,
  //       marginBottom: 8,
  //     }),
  //   },
  // },
};
