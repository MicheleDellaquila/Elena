import { Toaster } from "@components/ui/Sonner";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster position='top-right' richColors closeButton />
    </>
  );
};

export default RootLayout;
