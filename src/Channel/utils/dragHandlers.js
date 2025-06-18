import { arrayMove } from "@dnd-kit/sortable";

import { updateInterestChannels } from "@/Channel/services/interestChannels";
import { handleAsyncError } from "@/shared/utils/handleAsyncError";

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

  await handleAsyncError(
    () => updateInterestChannels(userId, newOrder),
    "Failed to update interest channel:"
  );
};
