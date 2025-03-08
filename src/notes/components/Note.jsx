import { useNavigate, useParams } from "react-router";
import { getNoteByTitle } from "../helpers/getNoteById";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import arrowLeft from "../../assets/images/icon-arrow-left.svg";
import iconDelete from "../../assets/images/icon-delete.svg";
import iconArchive from "../../assets/images/icon-archive.svg";
import iconTag from "../../assets/images/icon-tag.svg";
import iconClock from "../../assets/images/icon-clock.svg";
import { getDate } from "../helpers/getDate";

export const Note = ({ note }) => {
  const navigate = useNavigate();

  if (!note) {
    return <p>NO NOTE</p>;
  }
  return (
    <div className="px-4 pt-2">
      <div className="flex items-center justify-between  border-b border-b-slate-200 pb-2 lg:hidden">
        <div className="cursor-pointer">
          <button
            className="flex items-center hover:cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img src={arrowLeft} alt="Icon Arrow Left" />
            Back
          </button>
        </div>
        <div className="flex gap-5">
          <img className="cursor-pointer" src={iconDelete} alt="Icon Delete" />
          <img
            className="cursor-pointer"
            src={iconArchive}
            alt="Icon Archive"
          />
          <p className="cursor-pointer">Cancel</p>
          <p className="text-indigo-500 cursor-pointer">Save Note</p>
        </div>
      </div>

      <div className="pt-4">
        <div>
          <h2 className="text-3xl font-bold">{note.title}</h2>
        </div>
        <div className="flex flex-col gap-4 mt-5 border-b border-b-gray-200 pb-2">
          <div className="flex items-center w-full gap-10">
            <div className="flex">
              <img src={iconTag} alt="Icon Tag" />
              Tags
            </div>

            <div className="flex">
              {note.tags.map((tag, i) => (
                <p key={i}>
                  {tag} {i !== note.tags.length - 1 && ","}
                </p>
              ))}
            </div>
          </div>
          {/* Tags */}
          <div className="flex items-center w-full gap-10">
            <div className="flex">
              <img src={iconClock} alt="Icon Clock" />
              Last Edited
            </div>

            <div className="flex">{getDate(note.lastEdited)}</div>
          </div>
          {/* Last Edited */}
        </div>
      </div>
      {/* Info Note */}

      {/* Info Content */}
      <div>
        <p>
          {note.content.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};
