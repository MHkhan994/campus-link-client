import { Outlet } from 'react-router-dom'
import Navbar from './shared/Navbar'

function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default App
