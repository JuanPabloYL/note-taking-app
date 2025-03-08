import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [archiveNotes, setarchiveNotes] = useState([]);
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetch("/data/data.json");
      const { notes } = await data.json();
      setNotes(notes);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleArchiveNote = (userNote) => {
    const exists = archiveNotes.some((note) => note.id === userNote.id);
    console.log("handleArchiveNote");

    if (!exists) {
      console.log("archived!");
      setarchiveNotes((prevValue) => [...prevValue, userNote]);
    }
    console.log(archiveNotes);
  };

  const handleDeleteNote = (userNote) => {
    const exists = notes.some((note) => note.id === userNote.id);

    if (exists) {
      const updatedNotes = notes.filter((note) => note.id !== userNote.id);
      setNotes(updatedNotes);
      navigate(-1);
    }
    console.log(notes);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
