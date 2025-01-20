import './App.css'
import { Routes, Route } from "react-router";
import MovieContextProvider from '@/utils/MovieContextProvider'
import { Outlet } from "react-router"; // to remove
import Favorite from './section/Favorite';
import Home from './section/Home';
import Search from './section/Search';
import Settings from './section/Settings';
function App() {

  return (
    <>
      <MovieContextProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path='favorite' element={<Favorite />} />
          <Route path='search/:searchType/:searchInput' element={<Search />} />
          <Route path='settings' element={<Settings />} />
          <Route path='*' element={<h1 className='mx-auto my-4 block w-fit text-red-600'>ERROR!</h1>} />
        </Routes>
      </MovieContextProvider>
    </>
  )
}

export default App
