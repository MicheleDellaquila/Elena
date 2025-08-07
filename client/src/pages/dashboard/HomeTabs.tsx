import { TabsList, TabsTrigger } from "@components/ui/Tabs";

const HomeTabs = () => {
  return (
    <TabsList className="flex w-full mb-4">
      <TabsTrigger className="flex-1" value='own-courses'>I miei corsi</TabsTrigger>
      <TabsTrigger className="flex-1" value='profile'>Profilo</TabsTrigger>
    </TabsList>
  );
};

export default HomeTabs;
