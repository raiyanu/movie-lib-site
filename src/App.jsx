import "./App.css";
import { Routes, Route } from "react-router";
import MovieContextProvider from "@/utils/MovieContextProvider";
import Favorite from "./section/Favorite";
import Home from "./section/Home";
import Search from "./section/Search";
import Settings from "./section/Settings";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  return (
    <>
      <MovieContextProvider>
        <Routes>
          <Route
            index
            element={
              <AnimatePresence mode="wait">
                <motion.div key="home" initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} exit={{ opacity: 0.5 }} transition={{ duration: 0.050 }}>
                  <Home />
                </motion.div>
              </AnimatePresence>
            }
          />
          <Route
            path="favorite"
            element={
              <AnimatePresence mode="wait">
                <motion.div key="favorite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Favorite />
                </motion.div>
              </AnimatePresence>
            }
          />
          <Route
            path="search/:searchType/:searchInput"
            element={
              <AnimatePresence mode="wait">
                <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Search />
                </motion.div>
              </AnimatePresence>
            }
          />
          <Route
            path="settings"
            element={
              <AnimatePresence mode="wait">
                <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Settings />
                </motion.div>
              </AnimatePresence>
            }
          />
          <Route
            path="*"
            element={
              <AnimatePresence mode="wait">
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h1 className="mx-auto my-4 block w-fit text-center text-red-600">
                    ERROR!
                  </h1>
                </motion.div>
              </AnimatePresence>
            }
          />
        </Routes>
      </MovieContextProvider>
    </>
  );
}

export default App;
