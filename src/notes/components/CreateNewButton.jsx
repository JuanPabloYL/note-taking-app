import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const CreateNewButton = () => {
  const { createNoteBtn, startNewNote, uid, noteApp } = useContext(AuthContext);

  const onClickNewNode = () => {
    console.log(uid);
    startNewNote();
    createNoteBtn();
  };

  return (
    <button
      // onClick={createNoteBtn}
      onClick={onClickNewNode}
      className="hidden lg:block mt-4 bg-indigo-500 py-2 w-full text-white rounded-xl hover:cursor-pointer disabled:bg-gray-400"
      disabled={noteApp.isSaving}
    >
      +Create New Note
    </button>
  );
};
