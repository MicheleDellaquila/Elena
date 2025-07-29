import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import router from "@/routes/router";

const isProduction = import.meta.env.PROD;

const AppRoot = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      {isProduction && <StrictMode><RouterProvider router={router} /></StrictMode>}
      {!isProduction && <RouterProvider router={router} />}
    </ErrorBoundary>
  );
};

export default AppRoot;
