
import './App.css'
import { useAppState } from './customHooks/useAppState'
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { useEffect } from 'react'
import { axiosInstance } from './libs/axiosInstance'
import { useAppDispatch } from './customHooks/useAppDispatch'
import Loader from './components/Loader'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'

function App() {

  const { user, isAuthenticated, loading } = useAppState();
  const dispatch = useAppDispatch();
  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      dispatch({ type: "getUser", payload: response.data.user })


      return response.data;
    } catch (error) {
      console.log(error);
      dispatch({ type: "getUserFailed" })

    }
  }
  useEffect(() => {
    getUser();
  }, [])

  if (loading) return <Loader />
  console.log(isAuthenticated, user);

  return (
    <Router>
      <Routes>
        <Route path='/*' element={<ProtectedRoute><Layout /></ProtectedRoute>} />
        <Route path='/login' element={!isAuthenticated && !user ? <Login /> : <Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
