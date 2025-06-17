import ChannelListItem from "@/Channel/components/ChannelListItem";
import ChannelSection from "@/Channel/components/ChannelSection";
import FavoriteChannelList from "@/Channel/components/FavoriteChannelList";
import { SECTION_TITLES } from "@/Channel/constants/messages";
import useCategorizeChannels from "@/Channel/hooks/useCategorizeChannels";
import useChannels from "@/Channel/hooks/useChannels";
import TabBar from "@/shared/components/TabBar";
import useUserData from "@/User/hooks/useUserData";

const Home = () => {
  useChannels();
  useUserData();
  const [favoriteChannelList, otherChannelList] = useCategorizeChannels();

  return (
    <>
      <TabBar />
      <div className="px-4 pt-8">
        <ChannelSection title={SECTION_TITLES.FAVORITE} height="h-60">
          <FavoriteChannelList channelList={favoriteChannelList} />
        </ChannelSection>
        <ChannelSection
          title={SECTION_TITLES.OTHER}
          marginTop="mt-6"
          height="h-80"
        >
          {otherChannelList.map(({ id, name, logoUrl }) => (
            <ChannelListItem
              key={id}
              channelId={id}
              channelName={name}
              thumbnail={logoUrl}
              backgroundColor="bg-gray-100"
            />
          ))}
        </ChannelSection>
      </div>
    </>
  );
};

export default Home;
