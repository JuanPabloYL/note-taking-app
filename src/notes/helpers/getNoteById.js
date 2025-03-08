export const getNoteByTitle = (title, notes) => {
  return notes.find((note) => note.title === title);
};
