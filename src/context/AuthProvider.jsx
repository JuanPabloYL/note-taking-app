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
    setarchiveNotes((prevArchiveNotes) => {
      if (prevArchiveNotes.some((note) => note.id === userNote.id)) {
        return prevArchiveNotes;
      }
      return [...prevArchiveNotes, userNote];
    });
  };

  const handleDeleteNote = (userNote) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== userNote.id)
    );
    setarchiveNotes((prevArchiveNotes) =>
      prevArchiveNotes.filter((note) => note.id !== userNote.id)
    );
    navigate(-1);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
