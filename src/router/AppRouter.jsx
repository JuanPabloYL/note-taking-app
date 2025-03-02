import { Route, Routes } from "react-router";
import { Notes } from "../notes/components/Notes";
import { Logo } from "../notes/components/Logo";
import { MenuBar } from "../notes/components/MenuBar";

export const AppRouter = () => {
  return (
    <>
      <Logo />
      <Routes>
        <Route path="/*" element={<Notes />} />
        <Route path="/note/:id" element={<Notes />} />
      </Routes>
      <MenuBar />
    </>
  );
};
