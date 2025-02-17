import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../Pages/Error";
import Categories from "../Pages/Categories";
import Brands from "../Pages/Brands";
import Login from "../Pages/Login";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Categories/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/brand",
        element: <Brands/>
      },
    ]
  }
]);