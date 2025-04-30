import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import Experience from './pages/Experience';
import Explanation from './pages/Explanation';
import UserTesting from './pages/UserTesting';
import About from './pages/About';
export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/experience' element={<Experience/>}/>
          <Route path='/explanation' element={<Explanation/>}/>
          <Route path='/usertesting' element={<UserTesting/>}/>
        </Routes>
      </Router>
    </div>
  )
}