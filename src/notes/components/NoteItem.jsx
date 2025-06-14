import { Link } from "react-router";
import { getDate } from "../helpers/getDate";

export const NoteItem = ({ note }) => {
  const { title, tags, lastEdited } = note;

  return (
    <Link
      to={`/note/${title}`}
      className="border-b border-b-gray-200 cursor-pointer block"
    >
      <div className="px-2">
        <div className="mt-2">
          <h3 className="font-bold">{title}</h3>
        </div>
        <div className="flex gap-1">
          {tags.map((tag, i) => (
            <div key={i} className="bg-gray-200 rounded px-1 my-3">
              {tag}
            </div>
          ))}
        </div>
        <div className="pb-2 text-sm">{getDate(lastEdited)}</div>
      </div>
    </Link>
  );
};
