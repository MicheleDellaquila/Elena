import SignUpLayout from "@layouts/SignUpLayout";
import Logo from "@components/ui/Logo";
import SignUpCard from "./SignUpCard";

const SignUp = () => {
  return (
    <SignUpLayout>
      <div className='container mx-auto flex justify-center min-h-screen'>
        <article className='w-full lg:w-6/12 xl:w-5/12 py-12'>
          <Logo className='mx-auto mb-8' />
          <SignUpCard />
        </article>
      </div>
    </SignUpLayout>
  );
};

export default SignUp;
