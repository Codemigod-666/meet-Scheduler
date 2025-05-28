// // store/storage.ts
// const isClient = typeof window !== "undefined";

// const storageSession = isClient
//   ? require("redux-persist/lib/storage/session").default
//   : {
//       getItem: () => null,
//       setItem: () => null,
//       removeItem: () => null,
//     };

// export default storageSession;

// storage.ts
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Safe way to handle sessionStorage in SSR
const createNoopStorage = () => {
  console.log("Session Rishi");
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storageSession =
  typeof window !== "undefined"
    ? createWebStorage("session")
    : createNoopStorage();

export default storageSession;
