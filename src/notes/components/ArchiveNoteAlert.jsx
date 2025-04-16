import { useContext } from "react";
import iconArchive from "../../assets/images/icon-archive.svg";
import { AuthContext } from "../../context/AuthContext";

export const ArchiveNoteAlert = ({ note }) => {
  const { setShowModal, handleArchiveNote } = useContext(AuthContext);

  const onArchive = () => {
    handleArchiveNote(note);
    setShowModal(false);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/85 grid place-content-center z-10">
      <div className="flex flex-col bg-white rounded w-1/2 mx-auto">
        <div className="flex border-b border-b-slate-400 pb-5 px-3 pt-3">
          <div className="pt-5 px-5">
            <img src={iconArchive} className="w-15" alt="Icon Archive" />
          </div>
          <div className="">
            <h2 className="font-bold  ">Archive Note</h2>
            <p>
              Are you sure you want to archive this note? You can find it in the
              Archive Notes section and restore it anytime.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 py-2 px-3">
          <button
            className="px-5 cursor-pointer bg-gray-200 rounded py-2"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-5 cursor-pointer bg-indigo-500 rounded py-2 text-white"
            onClick={onArchive}
          >
            Archive Note
          </button>
        </div>
      </div>
    </div>
  );
};
