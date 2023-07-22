import { Outlet, ScrollRestoration } from 'react-router-dom'
import Navbar from './shared/Navbar'

function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <ScrollRestoration></ScrollRestoration>
    </div>
  )
}

export default App
