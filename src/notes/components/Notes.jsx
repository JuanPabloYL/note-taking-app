import React, { useContext } from "react";
import { NoteItem } from "./NoteItem";
import { AuthContext } from "../../context/AuthContext";
import { CreateNewButton } from "./CreateNewButton";
import { SideBar } from "./SideBar";
import { useParams, useNavigate } from "react-router";
import { Note } from "./Note";
import iconSearch from "../../assets/images/icon-search.svg";
import iconSettings from "../../assets/images/icon-settings.svg";
import { getNoteById } from "../helpers/getNoteById";

export const Notes = () => {
  const { notes } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const note = getNoteById(id, notes);

  return (
    <>
      <div className="rounded-t px-4 pt-5 pb-21 lg:grid lg:grid-cols-[repeat(13,1fr)] gap-4 lg:rounded-none lg:p-0">
        <SideBar />

        <div className="col-start-3 col-end-14 lg:grid grid-cols-[repeat(8,1fr)] lg:grid-rows-[repeat(1,4rem)] min-h-screen">
          <div className="hidden col-span-full lg:flex justify-between py-4 pr-5 border-b border-b-gray-300">
            <h2 className="font-bold text-3xl">All Notes</h2>

            <div className="flex items-center gap-5">
              <div className="relative">
                <input
                  className="pl-8 border rounded-2xl border-gray-400 py-2 focus:outline-none"
                  type="text"
                  placeholder="Search by title, content, or tags..."
                />
                <img
                  className="absolute top-2 left-1"
                  src={iconSearch}
                  alt="Icon Search"
                />
              </div>

              <img className="w-7" src={iconSettings} alt="Icon Settings" />
            </div>
          </div>

          {/* Notes List Section */}
          <div className="col-span-2 border-r border-r-gray-200 row-start-2">
            <h2 className="font-bold text-3xl lg:hidden">All Notes</h2>
            <ul className="pt-4">
              {notes.map((note, i) => (
                <NoteItem key={i} note={note} />
              ))}
            </ul>
            <CreateNewButton />
          </div>

          {/* Desktop Layout: Note inside the grid */}
          <div className="hidden lg:block col-span-4 border-r border-r-gray-200">
            {note ? <Note /> : <p>Browse your notes!</p>}
          </div>

          {/* Mobile Layout: Note full-screen */}
          {id && (
            <div className="fixed inset-0 bg-white z-50 p-4 lg:hidden">
              <button
                className="absolute top-2 left-2 bg-gray-200 px-3 py-1 rounded"
                onClick={() => navigate("/")}
              >
                Back
              </button>
              <Note />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
