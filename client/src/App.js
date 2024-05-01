import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Add from "./pages/Add";
import Add1 from "./pages/Add1";
import Add2 from "./pages/Add2";
import Students from "./pages/Students";
import Settlements from "./pages/Settlements";
import Dormitories from "./pages/Dormitories";
import Update from "./pages/Update";
import Update1 from "./pages/Update1";
import Update2 from "./pages/Update2";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";
import "./style.css";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Students />,
      },
      {
        path: "/dormitories",
        element: <Dormitories />,
      },
      {
        path: "/settlements",
        element: <Settlements />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/update/:id",
    element: <Update />,
  },
  {
    path: "/add1",
    element: <Add1 />,
  },
  {
    path: "/update1/:id",
    element: <Update1 />,
  },
  {
    path: "/add2",
    element: <Add2 />,
  },
  {
    path: "/update2/:id",
    element: <Update2 />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
