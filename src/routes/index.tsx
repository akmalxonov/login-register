import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Admins from "../pages/admin";
import Menagers from "../pages/menagers";
import Teachers from "../pages/teacher";
import MainLayout from "../components/mainLayout";
import Login from "../pages/login";
import PrivateRoute from "../components/privateRoute";
import SignUp from "../pages/sign-up";

const protectedRoutes = [
  {
    path: "/",
    element: <Home />,
    private: true,
  },
  {
    path: "/admins",
    element: <Admins />,
    private: true,
  },
  {
    path: "/menagers",
    element: <Menagers />,
    private: true,
  },
  {
    path: "/teachers",
    element: <Teachers />,
    private: true,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: protectedRoutes.map(({ path, element, private: isPrivate }) => ({
      path,
      element: isPrivate ? (
        <PrivateRoute>{element}</PrivateRoute>
      ) : (
        element
      ),
    })),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp/>,
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);