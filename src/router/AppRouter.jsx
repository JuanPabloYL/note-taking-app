import { Route, Routes } from "react-router";
import { Notes } from "../notes/components/Notes";
import { Logo } from "../notes/components/Logo";
import { MenuBar } from "../notes/components/MenuBar";
import { Note } from "../notes/components/Note";

export const AppRouter = () => {
  return (
    <>
      <Logo />
      <Routes>
        <Route path="/home" element={<Notes />} />
        <Route path="/note/:id" element={<Note />} />
      </Routes>
      <MenuBar />
    </>
  );
};
