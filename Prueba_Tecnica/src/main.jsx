import { StrictMode } from "react";
//CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
//ReactDOM
import ReactDOM from "react-dom/client"; 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//Components
import { Tasks } from "./pages";

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
      <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
