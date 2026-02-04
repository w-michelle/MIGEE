/* eslint-disable @typescript-eslint/no-explicit-any */

import { MdCircle } from "react-icons/md";
export const getSwatch = (color: any) => {
  return <MdCircle style={{ color }} />;
};

export const getModuleName = (type: string) => {
  switch (type) {
    case "hero":
      return "Hero";
    case "marquee":
      return "marquee";
    case "dividerPhoto":
      return "Divider Photo";
    default:
      return "Unknown Module";
  }
};
