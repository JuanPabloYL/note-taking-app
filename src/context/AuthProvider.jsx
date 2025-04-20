import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";
import { signInWithGoogle } from "../firebase/providers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth, FirebaseDB } from "../firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore/lite";

const initialUserState = {
  uid: null,
  name: null,
  email: null,
  photoURL: null,
  status: false,
};

const noteAppState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: null,
};

const init = [];

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    return storedNotes ? storedNotes : init;
  });
  const [archiveNotes, setArchiveNotes] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [user, setUser] = useState(initialUserState);
  const [errorMessage, setErrorMessage] = useState("");
  const [noteApp, setNoteApp] = useState(noteAppState);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    const storedArchiveNotes = JSON.parse(localStorage.getItem("archiveNotes"));

    if (storedNotes) {
      setNotes(storedNotes);
    }
    if (storedArchiveNotes) {
      setArchiveNotes(storedArchiveNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("archiveNotes", JSON.stringify(archiveNotes));
  }, [notes, archiveNotes]);

  const handleArchiveNote = (userNote) => {
    setArchiveNotes((prevArchiveNotes) => {
      if (prevArchiveNotes.some((note) => note.id === userNote.id)) {
        return prevArchiveNotes;
      }
      return [...prevArchiveNotes, userNote];
    });
  };

  const handleDeleteNote = (userNote) => {
    // setNotes((prevNotes) =>
    //   prevNotes.filter((note) => note.id !== userNote.id)
    // );
    // setArchiveNotes((prevArchiveNotes) =>
    //   prevArchiveNotes.filter((note) => note.id !== userNote.id)
    // );
    setNoteApp((prev) => ({
      ...prev,
      notes: noteApp.notes.filter((note) => note.id !== userNote.id),
    }));

    setArchiveNotes((prevArchiveNotes) =>
      prevArchiveNotes.filter((note) => note.id !== userNote.id)
    );
    navigate(-1);
  };

  const filteredNotes = noteApp.notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchParam.toLowerCase()) ||
      note.content.toLowerCase().includes(searchParam.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchParam.toLowerCase())
      )
  );

  const createNoteBtn = () => navigate("/new-note");

  // const handleSaveNewNote = (note, e) => {
  //   e.preventDefault();
  //   const { id, title, content, tags, isArchived = false } = note;

  //   const inputTags = tags
  //     .split(",")
  //     .map((tag) => tag.trim())
  //     .filter((tag) => tag.length > 0);

  //   const inputTitle = title.trim();
  //   const inputContent = content.trim();

  //   if (!inputTags.length || !inputTitle || !inputContent) {
  //     return;
  //   }

  //   const savedDate = new Date().toLocaleDateString("en-US");

  //   const newNote = {
  //     id: id || crypto.randomUUID(),
  //     title: inputTitle,
  //     content: inputContent,
  //     tags: inputTags,
  //     lastEdited: savedDate,
  //     lastUpdate: savedDate,
  //     isArchived,
  //   };

  //   setNotes((prevNotes) => {
  //     const updatedNotes = [...prevNotes, newNote];

  //     // Update localStorage after state update
  //     localStorage.setItem("notes", JSON.stringify(updatedNotes));
  //     return updatedNotes;
  //   });

  //   // Navigate back or to notes page
  //   navigate("/");
  // };

  const startGoogleSignIn = async () => {
    const result = await signInWithGoogle();

    if (result.ok) {
      setUser({
        uid: result.uid,
        name: result.name,
        email: result.email,
        photoURL: result.photoURL,
        status: true,
      });
    } else {
      setUser(initialUserState);
    }
  };

  const registerUserEmailPassword = async ({ email, password, name }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      const { uid, photoURL } = response.user;

      await updateProfile(FirebaseAuth.currentUser, { displayName: name });
      return {
        ok: true,
        uid,
        photoURL,
        email,
        name,
      };
    } catch (error) {
      setErrorMessage(error.message);
      return { ok: false, errorMessage: error.message };
    }
  };

  const startUserEmailPassword = async ({ email, password, name }) => {
    const result = await registerUserEmailPassword({ email, password, name });

    if (!result.ok) {
      setUser(initialUserState);
      return;
    }

    setUser({
      uid: result.uid,
      name: result.name,
      email: result.email,
      photoURL: result.photoURL,
      status: true,
    });
  };

  const startLoginEmailPassword = async ({ email, password }) => {
    const response = await loginWithEmailPassword({ email, password });

    if (!response.ok) {
      setErrorMessage(response.errorMessage);
      setUser(initialUserState);
    }
    setErrorMessage("");
    setUser(response);
  };

  const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
  };

  const loginWithEmailPassword = async ({ email, password }) => {
    try {
      const response = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      const { uid, photoURL, displayName } = response.user;

      return { ok: true, uid, photoURL, displayName };
    } catch (error) {
      return { ok: false, errorMessage: error.message };
    }
  };

  const startLogout = async () => {
    await logoutFirebase();
    setUser(initialUserState);
  };

  const startNewNote = async (note) => {
    console.log("startNewNote");
    const { uid } = user;

    const { title, content, tags, isArchived = false } = note;

    const inputTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const inputTitle = title.trim();
    const inputContent = content.trim();
    const savedDate = new Date().toLocaleDateString("en-US");

    const newNote = {
      title: inputTitle,
      content: inputContent,
      tags: inputTags,
      lastEdited: savedDate,
      lastUpdate: savedDate,
      isArchived,
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/app-notes/notes`));
    await setDoc(newDoc, { ...newNote, id: newDoc.id });

    newNote.id = newDoc.id;
    setNoteApp((prev) => ({
      ...prev,
      notes: [...noteApp.notes, newNote],
      isSaving: true,
    }));

    console.log(noteApp);

    navigate("/");
  };

  const loadNotes = async (uid = "") => {
    if (!uid) throw new Error("The UID does not exts");

    const collectionRef = collection(FirebaseDB, `${uid}/app-notes/notes`);
    const docs = await getDocs(collectionRef);

    const notes_fb = [];

    docs.forEach((doc) => {
      notes_fb.push({ id: doc.id, ...doc.data() });
    });

    return notes_fb;
  };

  const startLoadingNotes = async () => {
    const { uid } = user;
    console.log(user);
    if (!uid) throw new Error("The UID does not exts");

    const notes_fb = await loadNotes(uid);
    setNoteApp((prev) => ({
      ...prev,
      notes: notes_fb,
      isSaving: false,
    }));
  };

  const startDeletingNote = async (note) => {
    const { uid } = user;
    console.log(uid);

    const docRef = doc(FirebaseDB, `${uid}/app-notes/notes/${note.id}`);
    await deleteDoc(docRef);
  };

  return (
    <AuthContext.Provider
      value={{
        notes,
        setNotes,
        loading,
        setLoading,
        searchParam,
        setSearchParam,
        handleArchiveNote,
        handleDeleteNote,
        archiveNotes,
        filteredNotes,
        createNoteBtn,
        // handleSaveNewNote,
        showModal,
        setShowModal,
        showDeleteModal,
        setShowDeleteModal,
        startGoogleSignIn,
        setUser,
        startUserEmailPassword,
        ...user,
        errorMessage,
        startLoginEmailPassword,
        startLogout,
        startNewNote,
        noteApp,
        startLoadingNotes,
        startDeletingNote,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
