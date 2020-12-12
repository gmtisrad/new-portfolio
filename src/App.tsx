import React, { useContext, useState, useEffect, useCallback } from "react";
import Wrapper from "./components/Wrapper";
import ThemeSwitcher from "./components/ThemeSwitcher";
import FramerCube from "./components/framerCube/FramerCube";
import StarField from "./components/StarField";
import ManipulatableCube from "./components/manipulatableCube/ManipulatableCube";
import ThemeContext from "./context/ThemeContext";
import ViewSwitcher from "./components/VeiwSwitcher";
import { Page, Frame, AnimatePresence, motion } from "framer";
import MobileLayout from "./components/MobileLayout";

enum ORIENTATIONS {
  LANDSCAPE = "LANDSCAPE",
  PORTRAIT = "PORTRAIT",
  UNKNOWN = "UNKNOWN",
}

const App: React.FC = () => {
  const { standardView } = useContext(ThemeContext);
  const [orientation, setOrientation] = useState(ORIENTATIONS.UNKNOWN);

  const updateOrientation = useCallback((): void => {
    if (window.innerHeight > window.innerWidth) {
      setOrientation(ORIENTATIONS.PORTRAIT);
    } else {
      setOrientation(ORIENTATIONS.LANDSCAPE);
    }

    console.log(orientation);
  }, [orientation, setOrientation]);

  useEffect(() => {
    window.onresize = (): void => {
      updateOrientation();
    };
  }, [updateOrientation]);

  useEffect(() => {
    setOrientation(
      window.outerHeight > window.outerWidth
        ? ORIENTATIONS.PORTRAIT
        : ORIENTATIONS.LANDSCAPE
    );
  }, []);

  return (
    <>
      <ThemeSwitcher />
      <ViewSwitcher />
      <StarField />
      {orientation === ORIENTATIONS.LANDSCAPE && (
        <AnimatePresence>
          {standardView && (
            <Wrapper>
              <motion.div
                key="standard"
                // initial={{ scale: 0.5 }}
                animate={{
                  scale: 1,
                }}
                exit={{
                  scale: 0.5,
                }}
              >
                <FramerCube />
              </motion.div>
            </Wrapper>
          )}
          {!standardView && (
            <Wrapper>
              <motion.div
                key="cube"
                initial={{ scale: 2 }}
                animate={{
                  scale: 1,
                }}
                exit={{
                  scale: 2,
                }}
              >
                <ManipulatableCube />
              </motion.div>
            </Wrapper>
          )}
        </AnimatePresence>
      )}

      {orientation === ORIENTATIONS.PORTRAIT && <MobileLayout />}
    </>
  );
};

export default App;
