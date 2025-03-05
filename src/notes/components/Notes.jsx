import React, { useContext } from "react";
import { NoteItem } from "./NoteItem";
import { AuthContext } from "../../context/AuthContext";
import { CreateNewButton } from "./CreateNewButton";
import { SideBar } from "./SideBar";

export const Notes = () => {
  const { notes } = useContext(AuthContext);

  return (
    <div className="rounded-t px-4 pt-5 pb-21 lg:grid lg:grid-cols-[repeat(13,1fr)] gap-4 lg:rounded-none lg:p-0">
      <SideBar />

      <div className="col-start-4 col-end-14 lg:grid grid-cols-[repeat(8,1fr)] lg:grid-rows-[repeat(1,4rem)] min-h-screen">
        <div className="col-start-1 cold-end-10">
          <h2 className="font-bold text-3xl">All Notes</h2>
        </div>
        <div className="col-span-3 border-r border-r-gray-200 row-start-2">
          <h2 className="font-bold text-3xl lg:hidden">All Notes</h2>
          <ul className="pt-4">
            {notes.map((note, i) => (
              <NoteItem key={i} note={note} />
            ))}
          </ul>
          <CreateNewButton />
        </div>

        {/* Note */}
        <div className="col-span-5 border-r border-r-gray-200"></div>
        <div>{/* Here */}</div>
      </div>
    </div>
  );
};
