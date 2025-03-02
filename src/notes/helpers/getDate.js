export const getDate = (lastEdited) => {
  const date = new Date(lastEdited).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return date;
};
