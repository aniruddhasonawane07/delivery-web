export const themeConfig = {
  colors: {
    primary: "#2874f0", // Flipkart Blue
    secondary: "#fb641b", // Flipkart Orange/Yellow
    background: "#f1f3f6", // Light gray background
    surface: "#ffffff", // Card backgrounds
    text: "#212121",
    textMuted: "#878787",
    border: "#f0f0f0",
    success: "#388e3c",
    error: "#ff6161",
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
  }
};

export type ThemeConfig = typeof themeConfig;
