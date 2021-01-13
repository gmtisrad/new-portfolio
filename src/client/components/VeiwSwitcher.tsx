import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import { getBackgroundColor, getTextColor } from "../utils/styleUtils";
import { viewSwitcherButtonStyle } from "../styles";

export const ViewSwitcher: React.FC = () => {
  const { toggleView, standardView } = useContext(ThemeContext);
  const { light, dark, neon } = useContext(ThemeContext);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    setBackgroundColor(getBackgroundColor(light, neon, dark));
    setTextColor(getTextColor(light, neon, dark));
  }, [light, dark, neon]);

  const handleClick = (): void => {
    toggleView();
  };

  return (
    <div
      className={viewSwitcherButtonStyle(backgroundColor, textColor)}
      onClick={handleClick}
    >
      {standardView ? "3D View" : "Standard View"}
    </div>
  );
};

export default ViewSwitcher;
