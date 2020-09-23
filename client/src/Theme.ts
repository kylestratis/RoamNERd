const mobileMaxWidthPx = 700;
const widescreenMinWidthPx = 1050;

export const theme = {
  spacer: 8,
  color: {
    primary: "#2e5266",
    secondary: "#9ee493",
  },
  devices: {
    mobile: `(max-width: ${mobileMaxWidthPx}px)`,
    widescreen: `(min-width: ${widescreenMinWidthPx}px)`,
  },
  // $color-theme-bg:;
  // $color-theme-page-bg: #9fb1bc;
  // $color-theme-text: ;
};
