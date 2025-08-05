import Logo from "@components/ui/Logo";
import Loader from "@components/ui/Loader";

const LoadingSessions = () => {
  return (
    <main className='min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-8'>
        <div className='flex flex-col items-center text-center space-y-2'>
          <Logo />
          <h1 className='text-2xl font-bold text-foreground mb-10'>Controllo sessione</h1>
          <Loader size='medium' />
        </div>
      </div>
    </main>
  );
};

export default LoadingSessions;
