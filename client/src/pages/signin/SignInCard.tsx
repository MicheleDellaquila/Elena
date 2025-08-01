import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/Card";
import SignInForm from "./SignInForm";
import { Link } from "react-router-dom";

const SignInCard = () => {
  return (
    <Card className='w-[calc(100%-1rem)] mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Accedi</CardTitle>
        <CardDescription>
          Inserisci le tue credenziali per accedere al tuo account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter>
        <div className='w-full text-center text-sm'>
          <span className='text-gray-600'>Non hai un account? </span>
          <Link to='/' className='text-blue-600 hover:text-blue-800 font-medium'>
            Registrati
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignInCard;
