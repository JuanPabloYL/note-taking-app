import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NoteItem } from "./NoteItem";
import iconSearch from "../../assets/images/icon-search.svg";

export const SearchNotes = () => {
  const { notes, searchParam, setSearchParam } = useContext(AuthContext);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchParam.toLowerCase()) ||
      note.content.toLowerCase().includes(searchParam.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchParam.toLowerCase())
      )
  );

  return (
    <div className="mx-5">
      <h2 className="font-bold text-3xl my-5">Search</h2>

      <form className="relative">
        <img
          className="absolute top-2 left-2"
          src={iconSearch}
          alt="Icon Search"
        />
        <input
          className="pl-9 border border-slate-500 w-full p-2 rounded-xl bg-gray-100"
          type="text"
          placeholder="Search by title, content or tags"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
        />
      </form>

      {searchParam && (
        <p className="py-2">
          All notes matching "{searchParam}" are displayed bellow.
        </p>
      )}
      <ul className="">
        {filteredNotes.length ? (
          filteredNotes.map((note, i) => <NoteItem key={i} note={note} />)
        ) : (
          <p className="mt-2">No Notes to Show</p>
        )}
      </ul>
    </div>
  );
};
