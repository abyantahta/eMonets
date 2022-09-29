// import logo from './logo.svg';
import './App.scss';
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './pages/Register'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />}></Route>
      <Route path='/register' element={<Register />}></Route>
    </Routes>
  );
}

export default App;
