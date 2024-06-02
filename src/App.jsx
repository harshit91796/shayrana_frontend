// src/App.jsx
import './App.css';
import Home from './pages/Home/Home';
import TopBar from './components/TopBar';
import SideBar from './components/Sidebar/SideBar';
import RightBar from './components/rightBar/RightBar';
import Profile from './components/profile/Profile';
import Login from './pages/Home/Login/Login';
import Register from './pages/Home/register/Register';
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import MyPost from './pages/Home/myPost/MyPost';
import Saved from './pages/Home/saved/Saved';
import Tagged from './pages/Home/tagged/Tagged';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import Messenger from './pages/messenger/Messenger';
import AudioBar from './components/audio/AudioBar';


function App() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route exact path='/' element={user ? <Home /> : <Register />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='/login' element={user ? navigate('/') : <Login />} />
        <Route path='/register' element={user ? navigate('/') : <Register />} />
        <Route path='/profile/:username/myPost' element={<MyPost />} />
        <Route path='/profile/:username/saved' element={<Saved />} />
        <Route path='/profile/:username/tagged' element={<Tagged />} />
        <Route path='/messenger/:username' element={<Messenger />} />
      </Routes>
      <AudioBar />
    </>
  );
}

export default App;
