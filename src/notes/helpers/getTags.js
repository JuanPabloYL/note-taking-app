export const getTags = (notes) => {
  const tags = notes.flatMap((note) => note.tags);
  const set = new Set(tags);
  return set;
};
