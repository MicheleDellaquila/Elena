import SignInLayout from "@layouts/SignInLayout";
import Logo from "@components/ui/Logo";
import SignInCard from "./SignInCard";

const SignIn = () => {
  return (
    <SignInLayout>
      <div className='container mx-auto flex justify-center min-h-screen'>
        <article className='w-full lg:w-6/12 xl:w-5/12 py-12'>
          <Logo className='mx-auto mb-8' />
          <SignInCard />
        </article>
      </div>
    </SignInLayout>
  );
};

export default SignIn;
