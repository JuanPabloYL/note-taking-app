import { Logo } from "./Logo";

import homeIcon from "../../assets/images/icon-home.svg";
import arrowIcon from "../../assets/images/icon-chevron-right.svg";
import archiveIcon from "../../assets/images/icon-archive.svg";
import tagIcon from "../../assets/images/icon-tag.svg";
import { NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getTags } from "../helpers/getTags";

export const SideBar = () => {
  const { notes } = useContext(AuthContext);

  const tags = getTags(notes);
  return (
    <div className="hidden lg:block col-span-3 border-r border-r-gray-200">
      <Logo />

      <div className="px-4 mt-2">
        <div className="border-b border-b-gray-200 pb-4">
          <NavLink
            to={`/home`}
            className="hover:cursor-pointer flex justify-between"
          >
            <div className="flex items-center gap-2">
              <img src={homeIcon} alt="Home Icon" />
              Home
            </div>

            <img src={arrowIcon} className="w-6" alt="Chevron Right" />
          </NavLink>
          <NavLink
            to={`/home`}
            className="hover:cursor-pointer flex justify-between mt-2"
          >
            <div className="flex items-center gap-2">
              <img src={archiveIcon} alt="Archive Icon" />
              Archive Notes
            </div>
          </NavLink>
        </div>

        <div>
          <p className="text-gray-500 mb-2">Tags</p>
          <ul className="flex flex-col gap-5">
            {[...tags].map((tag, i) => (
              <li
                key={i}
                className="flex items-center gap-2 hover:cursor-pointer"
              >
                <img src={tagIcon} alt="Tag Icon" />
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
