import {
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import SmallSidebarItem from "./SmallSidebarItem";
import { LargeSidebarItem, LargeSidebarSection } from "./LargeSidebarItems";
import { playlists, subscriptions } from "../data/Sidebar";
import { useSidebarContext } from "../context/SidebarContext";
import { PageHeaderFirstSection } from "../layouts/PageHeader";

const Sidebar = () => {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  return (
    <>
      <aside
        className={`sticky top-0 flex flex-col pb-4 ml-1 overflow-y-auto scrollbar-hidden ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={Home} title='Home' url='/' />
        <SmallSidebarItem Icon={Repeat} title='Shorts' url='/shorts' />
        <SmallSidebarItem Icon={Clapperboard} title='Subscription' url='/subscription' />
        <SmallSidebarItem Icon={Library} title='Library' url='/library' />
      </aside>

      {/* Large screen sidebar */}

      {isSmallOpen && (
        <div
          onClick={() => close()}
          className='h-screen w-screen lg:hidden fixed inset-0 bg-secondary-dark opacity-50 z-[999]'
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className='sticky top-0 px-2 pt-2 pb-4 bg-white lg:hidden'>
          <PageHeaderFirstSection hidden={false} />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem isActive IconOrImgUrl={Home} title='Home' url='/' />
          <LargeSidebarItem
            IconOrImgUrl={Clapperboard}
            title='Subscriptions'
            url='/subscriptions'
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem IconOrImgUrl={Library} title='Library' url='/library' />
          <LargeSidebarItem IconOrImgUrl={History} title='History' url='/history' />
          <LargeSidebarItem IconOrImgUrl={PlaySquare} title='Your Videos' url='/your-videos' />
          <LargeSidebarItem IconOrImgUrl={Clock} title='Watch Later' url='/playlist?list=WL' />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImgUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title='Subscriptions' visibleItemCount={7}>
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title='Explore'>
          <LargeSidebarItem IconOrImgUrl={Flame} title='Trending' url='/trending' />
          <LargeSidebarItem IconOrImgUrl={ShoppingBag} title='Shopping' url='/shopping' />
          <LargeSidebarItem IconOrImgUrl={Music2} title='Music' url='/music' />
          <LargeSidebarItem IconOrImgUrl={Film} title='Movies & TV' url='/movies-tv' />
          <LargeSidebarItem IconOrImgUrl={Radio} title='Live' url='/live' />
          <LargeSidebarItem IconOrImgUrl={Gamepad2} title='Gaming' url='/gaming' />
          <LargeSidebarItem IconOrImgUrl={Newspaper} title='News' url='/news' />
          <LargeSidebarItem IconOrImgUrl={Trophy} title='Sports' url='/sports' />
          <LargeSidebarItem IconOrImgUrl={Lightbulb} title='Learning' url='/learning' />
          <LargeSidebarItem IconOrImgUrl={Shirt} title='Fashion & Beauty' url='/fashion-beauty' />
          <LargeSidebarItem IconOrImgUrl={Podcast} title='Podcasts' url='/podcasts' />
        </LargeSidebarSection>
      </aside>
    </>
  );
};

export default Sidebar;
