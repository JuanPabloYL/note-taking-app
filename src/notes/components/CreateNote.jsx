import React, { useContext, useState } from "react";
import { NoteItem } from "./NoteItem";
import { AuthContext } from "../../context/AuthContext";
import { CreateNewButton } from "./CreateNewButton";
import { SideBar } from "./SideBar";
import iconSearch from "../../assets/images/icon-search.svg";
import iconSettings from "../../assets/images/icon-settings.svg";

export const CreateNote = () => {
  const {
    searchParam,
    setSearchParam,
    filteredNotes,
    handleSaveNewNote,
    startNewNote,
  } = useContext(AuthContext);

  const [note, setNote] = useState({
    id: new Date().getTime(),
    title: "",
    tags: "",
    content: "",
    lastEdited: "",
    isArchived: false,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    startNewNote(note);
  };

  return (
    <>
      <div className="rounded-t px-4 pt-5 pb-21 lg:grid lg:grid-cols-[repeat(13,1fr)] gap-4 lg:rounded-none lg:p-0 lg:h-screen lg:overflow-hidden">
        <SideBar />

        <div className="col-start-3 col-end-14 lg:grid grid-cols-[repeat(8,1fr)] lg:grid-rows-[repeat(1,4rem)] min-h-screen">
          <div className="hidden col-span-full lg:flex justify-between py-4 pr-5 border-b border-b-gray-300">
            <h2 className="font-bold text-3xl">
              {!searchParam
                ? "All Notes"
                : `Showing results for: "${searchParam}"`}
            </h2>

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

            <ul className="lg:overflow-y-auto lg:h-screen">
              {filteredNotes.length ? (
                filteredNotes.map((note, i) => <NoteItem key={i} note={note} />)
              ) : (
                <p className="mt-2">No Notes to Show</p>
              )}
            </ul>
          </div>

          {/* New Note form */}
          <form
            className="px-7 mt-5 col-span-4 border-r border-r-gray-200"
            onSubmit={onSubmit}
          >
            <input
              className="font-bold text-3xl p-2 rounded-lg"
              type="text"
              placeholder="Enter a title"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
            <div className="mt-5 border-b border-b-gray-200 pb-2">
              <div className="flex gap-2 items-center">
                <label htmlFor="tags" className="text-lg  flex-1/2 ">
                  Tags
                </label>
                <input
                  className="w-full p-1 focus:outline-gray-300 rounded-[.4rem]"
                  type="text"
                  placeholder="Add tags separated by commas (e.g. Work, Planning)"
                  value={note.tags}
                  onChange={(e) => setNote({ ...note, tags: e.target.value })}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="last" className="text-lg flex-1/2">
                  Last Edited
                </label>
                <input
                  className="w-full p-1 focus:outline-gray-300 rounded-[.4rem]"
                  type="text"
                  disabled
                  value={note.lastEdited}
                  onChange={(e) =>
                    setNote({ ...note, lastEdited: e.target.value })
                  }
                  placeholder="Not yet saved"
                />
              </div>
            </div>
            {/* Header */}

            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="15"
                className="h-full block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Write your thoughts here..."
                value={note.description}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              ></textarea>
            </div>

            <div className="flex gap-2 mt-5 items-start">
              <button
                className="bg-indigo-500 text-white py-2 px-4 rounded text-lg hover:cursor-pointer"
                type="submit"
              >
                Save
              </button>
              <button
                className="bg-gray-200 text-white py-2 px-4 rounded text-lg hover:cursor-pointer"
                value="Cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
