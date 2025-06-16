import { useEffect, useState } from "react";

import { useChannelStore } from "@/Channel/stores/useChannelStore";
import SearchResultListItem from "@/Search/components/SearchResultListItem";
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
          원하는 키워드(예시: SBS, 라디오, FM)를 입력해주세요.
        </p>
      )}

      {isEmptyResult && (
        <p className="mt-10 text-center text-sm text-gray-400">
          검색 결과가 없습니다.
        </p>
      )}
    </div>
  );
};

export default Search;
