import { useEffect, useState } from "react";

import { useChannelStore } from "@/Channel/stores/useChannelStore";
import SearchResultListItem from "@/Search/components/SearchResultListItem";
import { SEARCH_MESSAGES } from "@/Search/constants/messages";
import { useSearchStore } from "@/Search/stores/useSearchStore";

const Search = () => {
  const radioChannelList = useChannelStore((state) => state.radioChannelList);
  const interestChannelIds = useChannelStore(
    (state) => state.interestChannelIds
  );
  const keyword = useSearchStore((state) => state.keyword);
  const [filteredChannelList, setFilteredChannelList] = useState([]);
  const trimmedKeyword = keyword.trim();

  useEffect(() => {
    const upperKeyword = trimmedKeyword.toUpperCase();

    if (!upperKeyword) {
      setFilteredChannelList([]);
      return;
    }

    const searchResults = radioChannelList.filter(({ name }) =>
      name.toUpperCase().includes(upperKeyword)
    );

    setFilteredChannelList(searchResults);
  }, [trimmedKeyword, radioChannelList]);

  const isEmptyInput = trimmedKeyword === "";
  const isEmptyResult = trimmedKeyword && filteredChannelList.length === 0;

  return (
    <div className="w-full px-4">
      <ul className="mt-6">
        {filteredChannelList.map(({ id, name, logoUrl }) => (
          <SearchResultListItem
            key={id}
            channelId={id}
            channelName={name}
            thumbnail={logoUrl}
            backgroundColor="bg-white"
            isFavorite={interestChannelIds.includes(id)}
          />
        ))}
      </ul>

      {isEmptyInput && (
        <p className="mt-10 text-center text-sm text-gray-400">
          {SEARCH_MESSAGES.EMPTY_INPUT}
        </p>
      )}

      {isEmptyResult && (
        <p className="mt-10 text-center text-sm text-gray-400">
          {SEARCH_MESSAGES.EMPTY_RESULT}
        </p>
      )}
    </div>
  );
};

export default Search;
