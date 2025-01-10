import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Home from "../pages/Home";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "Products",
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: ":id",
            element: <ProductDetails />,
          },
        ],
      },
    ],
  },
]);
