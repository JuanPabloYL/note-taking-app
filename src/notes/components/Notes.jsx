import React, { useContext } from "react";
import { NoteItem } from "./NoteItem";
import { AuthContext } from "../../context/AuthContext";
import { CreateNewButton } from "./CreateNewButton";
import { SideBar } from "./SideBar";
import { useNavigate, useParams } from "react-router";
import { Note } from "./Note";
import iconSearch from "../../assets/images/icon-search.svg";
import iconSettings from "../../assets/images/icon-settings.svg";
import iconArchive from "../../assets/images/icon-archive.svg";
import iconArrowLeft from "../../assets/images/icon-arrow-left.svg";
import iconDelete from "../../assets/images/icon-delete.svg";
import { getNoteById } from "../helpers/getNoteById";

export const Notes = () => {
  const { notes, searchParam, setSearchParam } = useContext(AuthContext);
  const { id, tag } = useParams();
  const note = getNoteById(id, notes);
  const navigate = useNavigate();

  let title = "All Notes";
  let filteredNotes = notes;

  // Filter notes based on the tag
  if (tag) {
    filteredNotes =
      filteredNotes.filter((note) => note.tags.includes(tag)) || [];
    title = `Notes Tagged: ${tag}`;
  }

  // Filter notes based on searchParam (search by title, content, or tags)
  if (searchParam) {
    filteredNotes = filteredNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchParam.toLowerCase()) ||
        note.content.toLowerCase().includes(searchParam.toLowerCase()) ||
        note.tags.some((tag) =>
          tag.toLowerCase().includes(searchParam.toLowerCase())
        )
    );
    title = `Showing results for: "${searchParam}"`;
  }

  console.log(searchParam);

  return (
    <>
      <div className="rounded-t px-4 pt-5 pb-21 lg:grid lg:grid-cols-[repeat(13,1fr)] gap-4 lg:rounded-none lg:p-0">
        <SideBar />

        <div className="col-start-3 col-end-14 lg:grid grid-cols-[repeat(8,1fr)] lg:grid-rows-[repeat(1,4rem)] min-h-screen">
          <div className="hidden col-span-full lg:flex justify-between py-4 pr-5 border-b border-b-gray-300">
            <h2
              className="font-bold text-3xl"
              dangerouslySetInnerHTML={{ __html: title }}
            ></h2>

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
            {tag ? (
              <>
                <button
                  className="lg:hidden hover:cursor-pointer text-gray-400 flex items-center gap-2 mb-2"
                  onClick={() => navigate(-1)}
                >
                  <img
                    className="w-4"
                    src={iconArrowLeft}
                    alt="Icon Arrow Left"
                  />
                  Go Back
                </button>
                <h2 className="font-bold text-3xl lg:hidden">All Notes</h2>
              </>
            ) : (
              <h2 className="font-bold text-3xl lg:hidden">All Notes</h2>
            )}
            <button className="hidden lg:block mt-4 bg-indigo-500 py-2 w-full text-white rounded-xl hover:cursor-pointer">
              +Create New Note
            </button>

            {tag && (
              <p className="text-gray-800 py-2 hidden lg:block">
                All notes with the "{tag}" tag are shown here.
              </p>
            )}
            <ul className="">
              {filteredNotes.length ? (
                filteredNotes.map((note, i) => <NoteItem key={i} note={note} />)
              ) : (
                <p className="mt-2">No Notes to Show</p>
              )}
            </ul>
            <CreateNewButton />
          </div>

          {/* Desktop Layout: Note inside the grid */}
          <div className="hidden lg:block col-span-4 border-r border-r-gray-200">
            {note && <Note />}
          </div>

          {/* Mobile Layout: Note full-screen */}
          {id && (
            <div className="fixed inset-0 bg-white z-50 p-4 lg:hidden">
              <Note />
            </div>
          )}

          <div className="hidden lg:block col-span-2 pt-4">
            {id && (
              <div className="px-4 flex flex-col gap-4">
                <button className="hover:cursor-pointer border rounded-xl p-2 border-gray-300 flex gap-2 w-full">
                  <img src={iconArchive} alt="Icon Archive" />
                  Archive Note
                </button>
                <button className="hover:cursor-pointer border rounded-xl p-2 border-gray-300 flex gap-2 w-full">
                  <img src={iconDelete} alt="Icon Archive" />
                  Delete Note
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
