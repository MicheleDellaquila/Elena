import type { PropsWithChildren } from "react";

const SignInLayout = ({ children }: PropsWithChildren) => {
  return <main className='bg-gradient-to-br from-blue-50 to-indigo-100'>{children}</main>;
};

export default SignInLayout;
