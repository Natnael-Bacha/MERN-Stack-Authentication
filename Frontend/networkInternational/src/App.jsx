import {Routes, Route} from 'react-router'
import UserSignup from './Pages/UserSignup'
import UserSignin from './Pages/UserSignin'
import HomePage from './Pages/HomePage'

function App() {


  return (
    <>
     <Routes>
      <Route path='/' element={<UserSignin/>}></Route>
      <Route path='/userSignup' element={<UserSignup/>}></Route>
      <Route path='/home' element={<HomePage/>}></Route>
     </Routes>
    </>
  )
}

export default App
