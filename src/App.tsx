import { useState } from "react";
import CategoryPills from "./components/CategoryPills";
import { categories, videos } from "./data/home";
import PageHeader from "./layouts/PageHeader";
import VideoGridItem from "./components/VideoGridItem";
import Sidebar from "./components/Sidebar";
import SidebarContextProvider from "./context/SidebarContext";

function App() {
  const [selectedCategories, setSelectedCategories] = useState(categories[0]);
  const onSelectCategory = (category: string) => {
    setSelectedCategories(category);
  };
  return (
    <SidebarContextProvider>
      <div className='flex flex-col max-h-screen'>
        <PageHeader />
        <div className='grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto'>
          <Sidebar />
          <div className='px-8 pb-4 overflow-x-hidden'>
            <div className='sticky top-0 z-10 pb-4 bg-white'>
              <CategoryPills
                categories={categories}
                selectedCategories={selectedCategories}
                onSelectCategory={onSelectCategory}
              />
            </div>
            <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
              {videos.map((video) => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarContextProvider>
  );
}

export default App;
