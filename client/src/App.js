import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Add from "./pages/Add";
import Add1 from "./pages/Add1";
import Students from "./pages/Students";
import Settlements from "./pages/Settlements";
import Dormitories from "./pages/Dormitories";
import Update from "./pages/Update";
import Update1 from "./pages/Update1";
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