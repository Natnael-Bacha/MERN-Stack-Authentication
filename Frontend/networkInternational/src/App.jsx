import {Routes, Route} from 'react-router'
import UserSignup from './Pages/UserSignup'
import UserSignin from './Pages/UserSignin'
import HomePage from './Pages/HomePage'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {

const [user, setUser] = useState(null);
const getUser = async ()=>{
  try {
    const {response} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/userAuth/login/success`, {withCredentials: true})
    console.log(response.user._json)
    setUser(response.user._json);
  } catch (error) {
    console.log(error)
  }
} 

useEffect(()=>{
  getUser();
}, [])
  return (
    <>
     <Routes>
      <Route path='/' element={user ? <HomePage/> : <UserSignin/>}></Route>
      <Route path='/userSignin' element={user ? <HomePage/> : <UserSignin/>}></Route>
      <Route path='/userSignup' element={user ? <HomePage/> : <UserSignup/>}></Route>
      <Route path='/home' element={<HomePage/>}></Route>
      <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
      <Route path='/resetPassword/:token' element={<ResetPassword/>}></Route>
     </Routes>
    </>
  )
}

export default App
