import React, { useContext, useState, useEffect } from "react";
import { css } from "@emotion/css";
import ThemeContext from "../../context/ThemeContext";
import { getTextColor } from "../../utils/styleUtils";

type Props = {
  heading: string;
  message: string;
};

const introWrapperStyle = (borderColor: string): string => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border: 1px solid ${borderColor};
  font-size: 1em;
`;

export const MiniIntroSlide: React.FC<Props> = (props: Props) => {
  const { heading, message } = props;
  const { light, dark, neon } = useContext(ThemeContext);
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    setTextColor(getTextColor(light, neon, dark));
  }, [light, dark, neon]);

  return (
    <div className={introWrapperStyle(textColor)}>
      <h1>{heading}</h1>
      <p>{message}</p>
    </div>
  );
};

export default MiniIntroSlide;
