import { createBrowserRouter } from "react-router";
import Layout from "@layouts/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <div>Home Page</div> }],
  },
]);

export default router;