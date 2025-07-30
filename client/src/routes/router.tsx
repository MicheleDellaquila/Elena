import { createBrowserRouter } from "react-router";
import Layout from "@/layouts/layout";
import SignUp from "@pages/signup/SignUp";

// @Actions
import signUpAction from "./actions/signUpAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    action: signUpAction,
    children: [{ index: true, element: <SignUp /> }],
  },
]);

export default router;