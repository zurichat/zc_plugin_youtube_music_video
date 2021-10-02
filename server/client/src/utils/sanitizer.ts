export const sanitize = (item) => {
  const newItem = {
    ...item,
    id: item.id || item._id,
    time: +item.time,
    userId: item.userId || item.user_id,
  };

  delete newItem._id;
  delete newItem.user_id;

  return newItem;
};
