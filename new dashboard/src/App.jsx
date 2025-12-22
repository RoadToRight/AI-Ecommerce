
import Login from './pages/Login'
import './App.css'
import Sidebar from './components/Sidebar'
import { useAppState } from './customHooks/useAppState'
import CollectionCreateForm from './pages/CollectionCreateForm'
import ProductCreateForm from './pages/ProductCreateForm'
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom"
import Adduser from './pages/Adduser'
import Content from './components/content'
import { ToastContainer } from "react-toastify"

function App() {

  const { user, isAuthenticated } = useAppState()

  return (
    <Router>
      {/* <ProductCreateForm />
      <CollectionCreateForm /> */}

      <Routes>

        <Route path='/' element={!user && !isAuthenticated ? <div style={{ display: `flex` }}><Sidebar /><Content /></div> : <Navigate to={"/login"} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/add/user' element={<Adduser />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
