import './App.css'
import { Routes, Route } from "react-router";
import MovieContextProvider from '@/utils/MovieContextProvider'
import { Outlet } from "react-router"; // to remove
import Favorite from './section/Favorite';
import Home from './section/Home';
function App() {

  return (
    <>
      <MovieContextProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path='favorite' element={<Favorite />}>
            <Route path='search' element={<h1>Search</h1>} />
          </Route>
        </Routes>
      </MovieContextProvider>
    </>
  )
}

export default App
