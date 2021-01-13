import React, { useContext, useState, useEffect, useCallback } from "react";
import { MiniIntroSlide } from "../slides/MiniIntroSlide";
import ThemeContext from "../../context/ThemeContext";
import { getBackgroundColor, getTextColor } from "../../utils/styleUtils";
import { cx } from "@emotion/css";
import {
  cubeWrapper,
  cubeViewport,
  cubeSideStyle,
  sideOne,
  sideTwo,
  sideThree,
  sideFour,
  sideFive,
  sideSix,
} from "./manipulatableCubeStyles";
import { motion, useMotionValue } from "framer";
import TerminalIntro from "../slides/TerminalIntro";
import AboutMe from "../slides/AboutMe";
import MyExperience from "../slides/MyExperience";
import {
  manipulatableCubeFaceStyle,
  manipulatableCubeWrapperStyle,
} from "../../styles";
import ContactMe from "../slides/ContactMe";
import { MyProjects } from "../slides/MyProjects";

export const ManipulatableCube: React.FC = () => {
  const { light, dark, neon } = useContext(ThemeContext);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [throttleEvent, setThrottleEvent] = useState(false);

  // Cube Animation State
  const cubeRotateX = useMotionValue(0);
  const cubeRotateY = useMotionValue(0);
  const [mouseDown, setMouseDown] = useState(false);

  const handleDrag = useCallback(
    (event: MouseEvent) => {
      let throttleTimeout;
      const getRotateX = (): number => {
        let newRotateX = cubeRotateX.get() - event.movementY * 0.3;
        newRotateX = newRotateX < -91 ? -90 : newRotateX;
        newRotateX = newRotateX > 91 ? 90 : newRotateX;
        return newRotateX;
      };
      if (mouseDown && !throttleEvent) {
        cubeRotateX.set(getRotateX());
        cubeRotateY.set(cubeRotateY.get() + event.movementX * 0.15);
        setThrottleEvent(true);
        throttleTimeout = setTimeout(() => {
          setThrottleEvent(false);
        }, 1000 / 90);
      } else if (!mouseDown) {
        clearTimeout(throttleTimeout);
      }
    },
    [cubeRotateX, cubeRotateY, mouseDown, throttleEvent]
  );

  useEffect(() => {
    setBackgroundColor(getBackgroundColor(light, neon, dark));
    setTextColor(getTextColor(light, neon, dark));
  }, [light, dark, neon]);

  useEffect(() => {
    window.onmousemove = handleDrag;
    window.onmousedown = (): void => setMouseDown(true);
    window.onmouseup = (): void => setMouseDown(false);
  }, [handleDrag]);

  return (
    <div className={cx("wrapper", manipulatableCubeWrapperStyle)}>
      <motion.div className={cubeViewport} animate="end">
        <motion.div
          style={{
            rotateX: `${cubeRotateX.get()}deg`,
            rotateY: `${cubeRotateY.get()}deg`,
          }}
          className={cx(
            cubeWrapper(light, cubeRotateX, cubeRotateY, textColor),
            "cube"
          )}
        >
          <motion.div
            className={cx(
              cubeSideStyle(backgroundColor, textColor),
              sideOne,
              "side"
            )}
          >
            <div className={manipulatableCubeFaceStyle}>
              <TerminalIntro />
            </div>
          </motion.div>
          <motion.div
            className={cx(
              cubeSideStyle(backgroundColor, textColor),
              sideTwo,
              "side"
            )}
          >
            <div className={manipulatableCubeFaceStyle}>
              <AboutMe />
            </div>
          </motion.div>
          <motion.div
            className={cx(
              cubeSideStyle(backgroundColor, textColor),
              sideThree,
              "side"
            )}
          >
            <div className={manipulatableCubeFaceStyle}>
              <MyExperience />
            </div>
          </motion.div>
          <motion.div
            className={cx(
              cubeSideStyle(backgroundColor, textColor),
              sideFour,
              "side"
            )}
          >
            <div className={manipulatableCubeFaceStyle}>
              <ContactMe />
            </div>
          </motion.div>
          <motion.div
            className={cx(
              cubeSideStyle(backgroundColor, textColor),
              sideFive,
              "side"
            )}
          >
            <div className={manipulatableCubeFaceStyle}>
              <MyProjects />
            </div>
          </motion.div>
          <motion.div
            className={cx(
              cubeSideStyle(backgroundColor, textColor),
              sideSix,
              "side"
            )}
          >
            <div className={manipulatableCubeFaceStyle}>
              <AboutMe />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ManipulatableCube;
