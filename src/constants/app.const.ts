/** Global config */
export const DATE_TIME_FORMAT = "DD/MM/YYYY H:mm";
export const DATE_FORMAT = "DD/MM/YYYY";

/** LocalStore keys */
export const USER_TOKEN = "USER_TOKEN";
export const LANGUAGE = "LANGUAGE";

export const SECRET_KEY = "MONOCO-CRYPTOJS-SECRET-KEY-01072023";

/** Enviroment */
export const ENV = {
  // GRAPHQL_URI: 'http://localhost:8080/v1/graphql/',
  GRAPHQL_URI: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "",
  API_URI: process.env.NEXT_PUBLIC_API_ENDPOINT || "",
  GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID || "",
  GRAPHQL_KEY: process.env.REACT_APP_APP_KEY,
  AUTH_KEY: process.env.REACT_APP_FB_API_KEY,
  AUTH_DOMAIN: process.env.REACT_APP_FB_AUTH_DOMAIN,
  PROJECT_ID: process.env.REACT_APP_FB_PROJECT_ID,
  STORAGE_BUCKET: process.env.REACT_APP_FB_STORAGE_BUCKET,
  MESSAGING_SENDER_ID: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  APP_ID: process.env.REACT_APP_FB_APP_ID,
  MEASUREMENT_ID: process.env.REACT_APP_FB_MEASUREMENT_ID,
  GOOGLE_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  APP_CONFIG: process.env.REACT_APP_CONFIG,
};

/**Router */
export const PATH = {
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
};

/** Roles */
export enum Roles {
  admin = "admin",
  user = "user",
}

export const defaultTheme = {
  mode: "dark",
  pColor: {
    0: "#CC9B12",
    50: "#D6AF41",
    100: "#E1C372",
    200: "#EDDBA9",
    300: "#F7EFDA",
    400: "#FBF7EC",
  },
  sColor: {
    0: "#6096FF",
    50: "#3775EE",
  },
  tColor: {
    0: "#FFFFFF",
    50: "#FFFFFF",
    100: "#FFFFFF",
    200: "rgb(255 255 255 / 20%)",
    300: "rgb(255 255 255 / 30%)",
    400: "rgb(255 255 255 / 40%)",
    500: "rgb(255 255 255 / 50%)",
    600: "rgb(255 255 255 / 60%)",
    700: "rgb(255 255 255 / 70%)",
    800: "rgb(255 255 255 / 80%)",
    900: "rgb(255 255 255 / 90%)",
  },
  bColor: {
    0: "#0B0B0C",
    50: "#0B0B0C",
    100: "rgb(255 255 255 / 8%)",
    200: "rgb(255 255 255 / 4%)",
    300: "rgb(255 255 255 / 2%)",
    400: "rgb(255 255 255 / 12%)",
    500: "rgb(0 0 0 / 40%)",
    600: "rgb(255 255 255 / 16%)",
  },
  lColor: {
    0: "rgb(96 150 255 / 16%)",
    50: "rgb(96 150 255 / 16%)",
    100: "rgb(96 150 255 / 16%)",
    200: "rgb(204 155 18 / 8%)",
    300: "rgb(255 255 255 / 10%)",
    400: "rgb(255 255 255 / 16%)",
    500: "rgb(204 155 18 / 30%)",
    600: "rgb(96 150 255 / 30%)",
    700: "rgb(204 155 18 / 16%)",
  },
  error: {
    main: "#eb5a46",
  },
  warning: {
    main: "#FFAB49",
  },
  success: {
    main: "#57CB25",
  },
};

export const lightTheme = {
  mode: "light",
  pColor: {
    0: "#CC9B12",
    50: "#D6AF41",
    100: "#E1C372",
    200: "#EDDBA9",
    300: "#F7EFDA",
    400: "#FBF7EC",
  },
  sColor: {
    0: "#6096FF",
    50: "#3775EE",
  },
  tColor: {
    0: "#FFFFFF",
    50: "#FFFFFF",
    100: "rgb(255 255 255 / 10%)",
    200: "rgb(255 255 255 / 20%)",
    300: "rgb(255 255 255 / 30%)",
    400: "rgb(255 255 255 / 40%)",
    500: "rgb(255 255 255 / 50%)",
    600: "rgb(255 255 255 / 60%)",
    700: "rgb(255 255 255 / 70%)",
    800: "rgb(255 255 255 / 80%)",
    900: "rgb(255 255 255 / 90%)",
  },
  bColor: {
    0: "#0B0B0C",
    50: "#0B0B0C",
    100: "rgb(255 255 255 / 8%)",
    200: "rgb(255 255 255 / 4%)",
    300: "rgb(255 255 255 / 2%)",
    400: "rgb(255 255 255 / 12%)",
    500: "rgb(0 0 0 / 40%)",
  },
  lColor: {
    0: "rgb(96 150 255 / 16%)",
    50: "rgb(96 150 255 / 16%)",
    100: "rgb(96 150 255 / 16%)",
    200: "rgb(204 155 18 / 8%)",
    300: "rgb(255 255 255 / 10%)",
    400: "rgb(255 255 255 / 16%)",
    500: "rgb(96 150 255 / 30%)",
    600: "rgb(96 150 255 / 30%)",
    700: "rgb(204 155 18 / 16%)",
  },
  error: {
    main: "#F45647",
  },
  warning: {
    main: "#FFAB49",
  },
  success: {
    main: "#57CB25",
  },
};

export const defaultAppConfig = {
  title: "Startup Ecosystem on Autopilot",
  themeConfig: defaultTheme,
};

//chart
export const colorsChart = [
  "#D6AF41",
  "#2CBDB0",
  "#6096FF",
  "#D639B8",
  "#6E5DF5",
  "#FFAB49",
  "#71717A",
];

export const VALIDATION_NUMBER_COMMON = {
  MAX_LENGTH_10: {
    maxLength: 9999999999,
    message: "maximum 10 caractères",
  },
};

export const CURRENT_PATH = "currentPath";
export const NEW_USER = "new_user";
export const ORDER = "order";

export const YesNoOption = [
  { label: "Oui", value: "Oui" },
  { label: "Non", value: "Non" },
];
