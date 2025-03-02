import React, { useContext } from "react";
import { MenuBar } from "./MenuBar";
import { NoteItem } from "./NoteItem";
import { AuthContext } from "../../context/AuthContext";

export const Notes = () => {
  const { notes } = useContext(AuthContext);

  return (
    <div className="rounded-t px-4 pt-5 pb-21">
      <h2 className="font-bold text-3xl">All Notes</h2>
      <ul className="pt-4">
        {notes.map((note, i) => (
          <NoteItem key={i} note={note} />
        ))}
      </ul>
    </div>
  );
};
