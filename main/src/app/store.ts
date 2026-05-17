//  const store = createStore(
//    reducer, /* preloadedState, */
// +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//  );
import { configureStore } from "@reduxjs/toolkit";
// ...existing code...
// TODO: replace with your actual slice reducers
const reducer = {};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

// Types for hooks/selectors
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;