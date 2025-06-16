import { arrayMove } from "@dnd-kit/sortable";

import { updateInterestChannels } from "@/Channel/services/interestChannels";

export const handleChannelDragEnd = async (
  event,
  favoriteChannelList,
  setFavoriteChannelList,
  userId
) => {
  if (!userId) {
    return;
  }

  const { active, over } = event;
  if (!over || active.id === over.id) {
    return;
  }

  const oldIndex = favoriteChannelList.findIndex(
    (channel) => channel.id === active.id
  );
  const newIndex = favoriteChannelList.findIndex(
    (channel) => channel.id === over.id
  );

  const newList = arrayMove(favoriteChannelList, oldIndex, newIndex);
  setFavoriteChannelList(newList);

  const newOrder = newList.map((channel) => channel.id);
  try {
    await updateInterestChannels(userId, newOrder);
  } catch (error) {
    console.error("fetch updateFavorite failed: ", error);
  }
};
