import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/Card";
import SignUpForm from "./SignUpForm";
import { Link } from "react-router-dom";

const SignUpCard = () => {
  return (
    <Card className='w-[calc(100%-1rem)] mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Registrati</CardTitle>
        <CardDescription>Crea il tuo account per iniziare il percorso di apprendimento</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <div className='w-full text-center text-sm'>
          <span className='text-gray-600'>Hai già un account? </span>
          <Link to='/accedi' className='text-blue-600 hover:text-blue-800 font-medium'>
            Accedi
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUpCard;
