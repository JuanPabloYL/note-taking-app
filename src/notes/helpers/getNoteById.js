export const getNoteById = (id, notes) => {
  return notes.find((note) => note.title === id);
};
