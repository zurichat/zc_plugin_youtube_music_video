export const sanitize = (item) => {
  const newItem = { ...item, id: item.id || item._id, time: +item.time };
  if (newItem._id) delete newItem._id;

  return newItem;
};
