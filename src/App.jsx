import { useState } from 'react'
import { Button } from "@/components/ui/button"

import './App.css'
import MovieContext from './components/MovieContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MovieContext>
        <Button size="icon" >Hey</Button>
      </MovieContext>
    </>
  )
}

export default App
