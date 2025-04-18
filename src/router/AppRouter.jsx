import { Navigate, Route, Routes } from "react-router";
import { Logo } from "../notes/components/Logo";
import { MenuBar } from "../notes/components/MenuBar";
import { AllNotes } from "../notes/components/AllNotes";
import { SingleNote } from "../notes/components/SingleNote";
import { FilterNotes } from "../notes/components/FilterNotes";
import { Tags } from "../notes/components/Tags";
import { ArchivedNotes } from "../notes/components/ArchivedNotes";
import { SearchNotes } from "../notes/components/SearchNotes";
import { CreateNote } from "../notes/components/CreateNote";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";

export const AppRouter = () => {
  const { status, setUser } = useContext(AuthContext);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user)
        return setUser({
          uid: null,
          name: null,
          email: null,
          photoURL: null,
          status: false,
        });
      const { uid, email, displayName, photoURL } = user;
      setUser({ uid, email, displayName, photoURL, status: true });
      console.log(user);
    });
  }, []);

  return (
    <>
      <div className="block lg:hidden">
        <Logo />
      </div>
      <Routes>
        {status ? (
          <>
            <Route path="/home" element={<AllNotes />} />

            <Route path="/note/:title" element={<SingleNote />} />
            <Route path="/tags/:tag" element={<FilterNotes />} />

            {/* <Route path="/note/:id" element={<Notes />} /> */}

            <Route path="/tags" element={<Tags />} />
            <Route path="/new-note" element={<CreateNote />} />
            <Route path="/search" element={<SearchNotes />} />
            <Route path="/archive-notes" element={<ArchivedNotes />} />
            <Route path="/*" element={<Navigate to={`/home`} />} />
          </>
        ) : (
          <>
            <Route path="login" element={<LoginPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
          </>
        )}

        <Route path="/*" element={<Navigate to="/login" />} />
        {/* // <Route path="/home" element={<AllNotes />} /> */}

        {/* // <Route path="/note/:title" element={<SingleNote />} /> */}
        {/* // <Route path="/tags/:tag" element={<FilterNotes />} /> */}
        {/* // <Route path="login" element={<LoginPage />} /> */}
        {/* // <Route path="sign-up" element={<SignUpPage />} /> */}
        {/* <Route path="/note/:id" element={<Notes />} />
        // /> */}
        {/* // <Route path="/tags" element={<Tags />} /> */}
        {/* // <Route path="/new-note" element={<CreateNote />} /> */}
        {/* // <Route path="/search" element={<SearchNotes />} /> */}
        {/* // <Route path="/archive-notes" element={<ArchivedNotes />} /> */}
        {/* // <Route path="/*" element={<Navigate to={`/home`} />} /> */}
      </Routes>
      <MenuBar />
    </>
  );
};
