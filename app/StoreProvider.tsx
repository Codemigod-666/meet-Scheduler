// "use client";
// import React from "react";
// import { Provider } from "react-redux";
// import { store } from "./store/store";
// import Header from "@/components/Header";
// import { Footer2 } from "@/components/Footer";

// const StoreProvider = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <Provider store={store}>
//       <Header />
//       <div>{children}</div>
//       <Footer2 />
//     </Provider>
//   );
// };

// export default StoreProvider;

// StoreProvider.tsx
"use client";

import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Header from "@/components/Header";
import { Footer2 } from "@/components/Footer";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <div>{children}</div>
        <Footer2 />
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
