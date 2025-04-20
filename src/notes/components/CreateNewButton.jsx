import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const CreateNewButton = () => {
  const { createNoteBtn } = useContext(AuthContext);

  return (
    <button
      onClick={createNoteBtn}
      className="hidden lg:block mt-4 bg-indigo-500 py-2 w-full text-white rounded-xl hover:cursor-pointer disabled:bg-gray-400"
    >
      +Create New Note
    </button>
  );
};
