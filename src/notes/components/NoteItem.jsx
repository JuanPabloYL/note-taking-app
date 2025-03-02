import { Link } from "react-router";

export const NoteItem = ({ note }) => {
  const { title, tags, lastEdited } = note;
  const date = new Date(lastEdited).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      to={`/note/${title}`}
      className="border-b border-b-gray-100 cursor-pointer"
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
        <div className="pb-2 text-sm">{date}</div>
      </div>
    </Link>
  );
};
