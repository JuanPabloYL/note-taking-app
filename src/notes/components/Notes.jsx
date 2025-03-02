import React, { useEffect, useState } from "react";
import { MenuBar } from "./MenuBar";
import { NoteItem } from "./NoteItem";

export const Notes = () => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);

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
  console.log(notes);
  return (
    <div className="rounded-t px-4 pt-5 pb-21">
      <h2 className="font-bold text-3xl">All Notes</h2>
      <ul className="pt-4">
        {notes.map((note, i) => (
          <NoteItem key={i} note={note} />
        ))}
      </ul>
    </div>
  );
};
