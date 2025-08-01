import { createBrowserRouter } from "react-router";
import Layout from "@layouts/RootLayout";
import SignUp from "@pages/signup/SignUp";
import SignIn from "@pages/signin/SignIn";

// @Actions
import signUpAction from "./actions/signUpAction";
import signInAction from "./actions/signInAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    action: signUpAction,
    children: [
      { index: true, element: <SignUp /> },
      { path: "accedi", element: <SignIn />, action: signInAction },
    ],
  },
]);

export default router;
