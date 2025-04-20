import { AuthContext } from "../../context/AuthContext";

import { useContext } from "react";
import iconDelete from "../../assets/images/icon-delete.svg";

export const DeleteNoteAlert = ({ note }) => {
  const { setShowDeleteModal, handleDeleteNote, startDeletingNote } =
    useContext(AuthContext);

  const onDelete = () => {
    setShowDeleteModal(false);
    handleDeleteNote(note);
    startDeletingNote(note);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 grid place-content-center z-10">
      <div className="flex flex-col bg-white rounded w-1/2 mx-auto">
        <div className="flex border-b border-b-slate-400 pb-5 px-3 pt-3">
          <div className="pt-5 px-5">
            <img src={iconDelete} className="w-15" alt="Icon Archive" />
          </div>
          <div className="">
            <h2 className="font-bold  ">Delete Note</h2>
            <p>
              Are you sure you want to archive this note? You can find it in the
              Archive Notes section and restore it anytime.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 py-2 px-3">
          <button
            className="px-5 cursor-pointer bg-gray-200 rounded py-2"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-5 cursor-pointer bg-red-500 rounded py-2 text-white"
            onClick={onDelete}
          >
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
};
