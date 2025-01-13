import './App.css'

import MovieContextProvider from '@/utils/MovieContextProvider'
function App() {

  return (
    <>
      <MovieContextProvider>
        <h1>Home</h1>
        <h1>Search</h1>
      </MovieContextProvider>
    </>
  )
}

export default App
