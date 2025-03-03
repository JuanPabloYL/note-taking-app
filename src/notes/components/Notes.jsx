import React, { useContext } from "react";
import { MenuBar } from "./MenuBar";
import { NoteItem } from "./NoteItem";
import { AuthContext } from "../../context/AuthContext";
import { CreateNewButton } from "./CreateNewButton";
import { SideBar } from "./SideBar";
import { Note } from "./Note";

export const Notes = () => {
  const { notes } = useContext(AuthContext);

  return (
    <div className="rounded-t px-4 pt-5 pb-21 lg:grid lg:grid-cols-[repeat(13,1fr)] gap-4 lg:rounded-none lg:p-0 ">
      <SideBar />

      <div className="col-span-3 border-r border-r-gray-200">
        <h2 className="font-bold text-3xl">All Notes</h2>
        <ul className="pt-4">
          {notes.map((note, i) => (
            <NoteItem key={i} note={note} />
          ))}
        </ul>
        <CreateNewButton />
      </div>
    </div>
  );
};
