import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import Experience from './pages/Experience';
import Explaination from './pages/Explaination';
import UserTesting from './pages/UserTesting';
export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/experience' element={<Experience/>}/>
          <Route path='/explaination' element={<Explaination/>}/>
          <Route path='/usertesting' element={<UserTesting/>}/>
        </Routes>
      </Router>
    </div>
  )
}