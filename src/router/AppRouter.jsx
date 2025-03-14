import { Navigate, Route, Routes } from "react-router";
import { Logo } from "../notes/components/Logo";
import { MenuBar } from "../notes/components/MenuBar";
import { AllNotes } from "../notes/components/AllNotes";
import { SingleNote } from "../notes/components/SingleNote";
import { FilterNotes } from "../notes/components/FilterNotes";
import { Tags } from "../notes/components/Tags";
import { ArchivedNotes } from "../notes/components/ArchivedNotes";
import { SearchNotes } from "../notes/components/SearchNotes";

export const AppRouter = () => {
  return (
    <>
      <div className="block lg:hidden">
        <Logo />
      </div>
      <Routes>
        <Route path="/home" element={<AllNotes />} />

        <Route path="/note/:title" element={<SingleNote />} />
        <Route path="/tags/:tag" element={<FilterNotes />} />
        {/* <Route path="/note/:id" element={<Notes />} />
        /> */}
        <Route path="/tags" element={<Tags />} />
        <Route path="/search" element={<SearchNotes />} />
        <Route path="/archive-notes" element={<ArchivedNotes />} />
        <Route path="/*" element={<Navigate to={`/home`} />} />
      </Routes>
      <MenuBar />
    </>
  );
};
