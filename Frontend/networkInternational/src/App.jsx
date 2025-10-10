import {Routes, Route} from 'react-router'
import UserSignup from './Pages/UserSignup'
import UserSignin from './Pages/UserSignin'
import HomePage from './Pages/HomePage'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'

function App() {


  return (
    <>
     <Routes>
      <Route path='/' element={<UserSignin/>}></Route>
      <Route path='/userSignin' element={<UserSignin/>}></Route>
      <Route path='/userSignup' element={<UserSignup/>}></Route>
      <Route path='/home' element={<HomePage/>}></Route>
      <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
      <Route path='/resetPassword/:token' element={<ResetPassword/>}></Route>
     </Routes>
    </>
  )
}

export default App
