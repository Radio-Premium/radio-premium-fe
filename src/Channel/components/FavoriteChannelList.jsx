import { closestCenter, DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

import FavoriteChannelListItem from "@/Channel/components/FavoriteChannelListItem";
import { handleChannelDragEnd } from "@/Channel/utils/dragHandlers";
import useUserId from "@/User/hooks/useUserId";

const FavoriteChannelList = ({ channelList }) => {
  const [favoriteChannelList, setFavoriteChannelList] = useState(channelList);
  const userId = useUserId();

  useEffect(() => {
    setFavoriteChannelList(channelList);
  }, [channelList]);

  const restrictToYRange = (args) => {
    const { transform } = args;

    const minY = -190;
    const maxY = 190;

    return {
      ...transform,
      y: Math.min(Math.max(transform.y, minY), maxY),
    };
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={(event) =>
        handleChannelDragEnd(
          event,
          favoriteChannelList,
          setFavoriteChannelList,
          userId
        )
      }
      modifiers={[restrictToVerticalAxis, restrictToYRange]}
    >
      <SortableContext
        items={favoriteChannelList}
        strategy={verticalListSortingStrategy}
      >
        {favoriteChannelList.map(({ logoUrl, id, name }) => (
          <FavoriteChannelListItem
            key={id}
            thumbnail={logoUrl}
            channelId={id}
            channelName={name}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default FavoriteChannelList;
