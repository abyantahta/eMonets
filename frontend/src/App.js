// import logo from './logo.svg';
import './App.scss';
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import CreateNewPassword from './pages/CreateNewPassword'
import Catatanku from './pages/Catatanku'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
      <Route path='/createnewpassword' element={<CreateNewPassword />}></Route>
      <Route path='/catatanku' element={<Catatanku />}></Route>
    </Routes>
  );
}

export default App;
