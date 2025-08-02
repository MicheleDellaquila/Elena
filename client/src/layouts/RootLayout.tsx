import { Toaster } from "@components/ui/Sonner";
import { Outlet } from "react-router-dom";
import useAutoLogin from "./hook/useAutoLogin";
import LoadingSessions from "@components/loadingSessions/LoadingSessions";

const RootLayout = () => {
  const { isLoading } = useAutoLogin();

  return (
    <>
      {isLoading && <LoadingSessions />}
      {!isLoading && (
        <>
          <Outlet />
          <Toaster position='top-right' richColors closeButton />
        </>
      )}
    </>
  );
};

export default RootLayout;
