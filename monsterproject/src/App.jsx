import { RouterProvider } from 'react-router-dom'
import './App.css'
import root from './router/root'
import.meta.env.VITE_API_KEY


function App() {


  return (
    <RouterProvider router={root}/>
  )
}

export default App
