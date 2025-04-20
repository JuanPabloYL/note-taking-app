import React, { useContext } from "react";
import { NoteItem } from "./NoteItem";
import { AuthContext } from "../../context/AuthContext";
import { CreateNewButton } from "./CreateNewButton";
import { SideBar } from "./SideBar";
import { useParams } from "react-router";
import iconSearch from "../../assets/images/icon-search.svg";
import iconSettings from "../../assets/images/icon-settings.svg";

export const FilterNotes = () => {
  const { searchParam, setSearchParam, noteApp } = useContext(AuthContext);
  const { tag } = useParams();

  const filteredNotes =
    noteApp.notes.filter((note) => note.tags.includes(tag)) || [];

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
                  value={searchParam}
                  onChange={(e) => setSearchParam(e.target.value)}
                />
                <img
                  className="absolute top-2 left-1"
                  src={iconSearch}
                  alt="Icon Search"
                />
              </div>

              <img
                className="w-7 hover:cursor-pointer"
                src={iconSettings}
                alt="Icon Settings"
              />
            </div>
          </div>

          {/* Notes List Section */}
          <div className="col-span-2 border-r border-r-gray-200 row-start-2 px-2">
            <CreateNewButton />

            <ul className="">
              {filteredNotes.length ? (
                filteredNotes.map((note, i) => <NoteItem key={i} note={note} />)
              ) : (
                <p className="mt-2">No Notes to Show</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
