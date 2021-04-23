import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import * as ROUTES from "../../routes";

export const SidebarData = [
  {
    title: "Home",
    path: ROUTES.HOME,
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Explore",
    path: ROUTES.EXPLORE,
    icon: <FaIcons.FaSearch />,
  },
  {
    title: "Library",
    path: ROUTES.LIBRARY,
    icon: <FaIcons.FaMusic />,
  },
  {
    title: "Profile",
    path: ROUTES.PROFILE,
    icon: <FaIcons.FaUserAlt />,
  },
  {
    title: "Upload",
    path: ROUTES.UPLOAD_SONG,
    icon: <FaIcons.FaUserAlt />,
  }
];
