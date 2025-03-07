import { Navigate, Route, Routes } from "react-router";
import { Notes } from "../notes/components/Notes";
import { Logo } from "../notes/components/Logo";
import { MenuBar } from "../notes/components/MenuBar";
import { Note } from "../notes/components/Note";
import { Tags } from "../notes/components/Tags";

export const AppRouter = () => {
  return (
    <>
      <div className="block lg:hidden">
        <Logo />
      </div>
      <Routes>
        <Route path="/note/:id" element={<Notes />} />
        <Route path="/home" element={<Notes />} />
        <Route path="/tags/:tag" element={<Notes />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/archive-notes" element={<Notes />} />

        <Route path="/*" element={<Navigate to={`/home`} />} />
      </Routes>
      <MenuBar />
    </>
  );
};
