import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";

import { Provider } from "react-redux";
import { store } from "./redux/store/store.ts";
// import "antd/dist/reset.css";
import { RouterProvider } from "react-router-dom";
import {routers} from'./routers/router.tsx'
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routers} />
    </Provider>
 
  
  </StrictMode>
);
