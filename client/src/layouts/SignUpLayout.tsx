import type { PropsWithChildren } from "react";

const SignUpLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      {children}
    </main>
  );
};

export default SignUpLayout;
