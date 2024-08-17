"use client";

/* Core */
import { Provider } from "react-redux";

/* Instruments */
import { store } from "@/store/rootStore";

export const StoreProviders = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>;
};
