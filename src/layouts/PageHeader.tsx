import { ArrowLeft, BellIcon, Menu, MicIcon, Search, Upload, User } from "lucide-react";
import Buttons from "../components/Buttons";
import { useState } from "react";
import { useSidebarContext } from "../context/SidebarContext";

export const PageHeaderFirstSection = ({ hidden }: { hidden: boolean }) => {
  const { toggle } = useSidebarContext();
  return (
    <div className={`items-center flex-shrink-0 gap-2 ${hidden ? "hidden" : "flex"}`}>
      <Buttons onClick={() => toggle()} size='icon' variant='ghost'>
        <Menu />
      </Buttons>
      <a href='/' className='text-3xl font-semibold text-red-500 logo'>
        YarcxTube
      </a>
    </div>
  );
};

const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  return (
    <div className='flex items-center justify-between gap-10 pt-2 mx-4 mb-6 lg:gap-20'>
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      <form
        className={`items-center justify-center flex-grow gap-4 ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}
      >
        {showFullWidthSearch && (
          <Buttons
            onClick={() => setShowFullWidthSearch(false)}
            size='icon'
            variant='ghost'
            className='flex-shrink-0'
            type='button'
          >
            <ArrowLeft />
          </Buttons>
        )}
        <div className='flex flex-grow max-w-[600px]'>
          <input
            type='search'
            placeholder='Search'
            className='w-full px-4 py-1 text-lg border rounded-l-full shadow-inner outline-none border-secondary-border shadow-secondary focus:border-blue-500'
          />
          <Buttons className='w-auto px-4 py-2 border border-l-0 rounded-r-full border-secondary-border'>
            <Search />
          </Buttons>
        </div>
        <Buttons size='icon' className='flex-shrink-0' type='button'>
          <MicIcon />
        </Buttons>
      </form>
      <div
        className={`items-center flex-shrink-0 md:gap-2 ${showFullWidthSearch ? "hidden" : "flex"}`}
      >
        <Buttons
          size='icon'
          onClick={() => setShowFullWidthSearch(true)}
          variant='ghost'
          className='md:hidden'
        >
          <Search />
        </Buttons>
        <Buttons size='icon' variant='ghost' className='flex-shrink-0 md:hidden' type='button'>
          <MicIcon />
        </Buttons>
        <Buttons size='icon' variant='ghost'>
          <Upload />
        </Buttons>
        <Buttons size='icon' variant='ghost'>
          <BellIcon />
        </Buttons>
        <Buttons size='icon' variant='ghost'>
          <User />
        </Buttons>
      </div>
    </div>
  );
};

export default PageHeader;
