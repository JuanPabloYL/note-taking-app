import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getTags } from "../helpers/getTags";
import { NavLink } from "react-router";

import iconTag from "../../assets/images/icon-tag.svg";

export const Tags = () => {
  const { notes } = useContext(AuthContext);

  const tags = getTags(notes);

  return (
    <div className="lg:hidden px-5 pt-5">
      <h2 className="text-3xl font-bold">Tags</h2>
      <div
        className="flex
    flex-col gap-3 mt-5"
      >
        {[...tags].map((tag, i) => (
          <NavLink
            className="flex gap-2 items-center text-lg border-b border-b-gray-200 pb-2"
            to={`/tags/${tag}`}
            key={i}
          >
            <img src={iconTag} alt="Icon Tag" />
            {tag}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
