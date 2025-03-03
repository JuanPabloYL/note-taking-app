import React from "react";
import { NavLink } from "react-router";
import home from "../../assets/images/icon-home.svg";
import search from "../../assets/images/icon-search.svg";
import archive from "../../assets/images/icon-archive.svg";
import tag from "../../assets/images/icon-tag.svg";
import settings from "../../assets/images/icon-settings.svg";

export const MenuBar = () => {
  return (
    <div className="flex fixed bottom-0 bg-white justify-between left-0 right-0 px-4 py-2 lg:hidden">
      <NavLink
        to={`/home`}
        className={({ isActive }) =>
          `flex items-center flex-col px-5 py-2 rounded ${
            isActive ? "bg-indigo-100" : "bg-white"
          }`
        }
      >
        <img className="w-7" src={home} alt="Home Icon" />
        Home
      </NavLink>
      <NavLink
        to={`/search`}
        className={({ isActive }) =>
          `flex items-center flex-col px-5 py-2 rounded ${
            isActive ? "bg-indigo-100" : ""
          }`
        }
      >
        <img src={search} alt="Search Icon" />
        Search
      </NavLink>
      <NavLink
        to={`/archived`}
        className={({ isActive }) =>
          `flex items-center flex-col px-5 py-2 rounded ${
            isActive ? "bg-indigo-100" : ""
          }`
        }
      >
        <img src={archive} alt="Archived Icon" />
        Archived
      </NavLink>
      <NavLink
        to={`/tags`}
        className={({ isActive }) =>
          `flex items-center flex-col px-5 py-2 rounded ${
            isActive ? "bg-indigo-100" : ""
          }`
        }
      >
        <img src={tag} alt="Tags Icon" />
        Tags
      </NavLink>
      <NavLink
        to={`/settings`}
        className={({ isActive }) =>
          `flex items-center flex-col px-5 py-2 rounded ${
            isActive ? "bg-indigo-100" : ""
          }`
        }
      >
        <img src={settings} alt="Settings Icon" />
        Settings
      </NavLink>
    </div>
  );
};
