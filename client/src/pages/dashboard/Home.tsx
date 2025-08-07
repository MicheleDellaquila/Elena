import HomeLayout from "@layouts/HomeLayout";
import { Tabs, TabsContent } from "@components/ui/Tabs";
import HomeTabs from "./HomeTabs";
import OwnCourses from "./OwnCourses";
import Profile from "./Profile";

const Home = () => {
  return (
    <HomeLayout>
      <div className='container mx-auto'>
        <section className='py-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Ciao, Mario 👋</h1>
          <p className='text-lg text-gray-600'>
            Continua il tuo percorso di apprendimento.
          </p>
        </section>
        <section>
          <Tabs defaultValue='own-courses'>
            <HomeTabs />
            <TabsContent value='own-courses'>
              <OwnCourses />
            </TabsContent>
            <TabsContent value='profile'>
              <Profile />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </HomeLayout>
  );
};

export default Home;
