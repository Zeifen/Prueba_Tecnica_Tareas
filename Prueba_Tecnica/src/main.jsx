import { StrictMode } from "react";
//CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
//ReactDOM
import ReactDOM from "react-dom/client"; 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//Components
import { Tasks } from "./pages";
//Provider
import Provider from "./context/Provider";

const router = createBrowserRouter(
  [
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Tasks />,
        },
      ],
    },
  ],
);

//Se creó la ruta con ReactDOM
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
