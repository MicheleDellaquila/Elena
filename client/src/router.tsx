import { createBrowserRouter } from "react-router";
import Layout from "@/layouts/layout";
import SignUp from "@pages/signup/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <SignUp /> }],
  },
]);

export default router;