import { Outlet, ScrollRestoration } from 'react-router-dom'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'

function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ScrollRestoration></ScrollRestoration>
    </div>
  )
}

export default App
