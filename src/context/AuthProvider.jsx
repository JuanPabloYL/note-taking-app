import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [archiveNote, setarchiveNote] = useState([]);
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
    const exists = notes.some((note) => note.id === userNote.id);
    console.log("handleArchiveNote");

    if (!exists) {
      console.log("archived!");
      setarchiveNote((prevValue) => ({ ...prevValue, userNote }));
    }
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
