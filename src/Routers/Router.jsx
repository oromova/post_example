import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../Pages/Error";
import Categories from "../Pages/Categories";
import Brands from "../Pages/Brands";
import Login from "../Pages/Login";
import Cities from "../Pages/Cities";
import Cars from "../Pages/Cars";
import Locations from "../Pages/Locations";
import Models from "../Pages/Models";

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
      {
        path: "/cities",
        element: <Cities/>
      },
      {
        path: "/locations",
        element: <Locations/>
      },
      {
        path: "/cars",
        element: <Cars/>
      },
      {
        path: "/models",
        element: <Models/>
      },
    ]
  }
]);