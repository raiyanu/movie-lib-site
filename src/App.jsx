import './App.css'
import { Routes, Route } from "react-router";
import MovieContextProvider from '@/utils/MovieContextProvider'
import { Outlet } from "react-router"; // to remove
function App() {

  return (
    <>
      <MovieContextProvider>
        <Routes>
          <Route index element={<h1>Home</h1>} />
          <Route path='test' element={<h1>test <br /> <Outlet /> </h1>}>
            <Route path='search' element={<h1>Search</h1>} />
          </Route>
        </Routes>
      </MovieContextProvider>
    </>
  )
}

export default App
