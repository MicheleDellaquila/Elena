import type { PropsWithChildren } from "react";

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="px-4 min-h-screen bg-gray-50">
      {children}
    </main>
  );
};

export default HomeLayout;
