import { useState } from "react";
import { NoteItem } from "./NoteItem";
import { Note } from "./Note";

export const NewNote = () => {
  const [note, setNote] = useState({
    id: "",
    title: "",
    tags: [],
    content: "",
    lastEdited: "",
    isArchived: false,
  });

  return (
    <div>
      <Note note={note} />
    </div>
  );
};
