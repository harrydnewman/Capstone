import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import Experience from './pages/Experience';
import Online from './pages/Online';
import Privacy from './pages/Privacy';
import Statistics from './pages/Statistics';
import Explaination from './pages/Explaination';
import UserTesting from './pages/UserTesting';
import NewStart from './pages/Start';
export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/experience' element={<Experience/>}/>
          <Route path='/online' element={<Online/>}/>
          <Route path='/privacy' element={<Privacy/>}/>
          <Route path='/statistics' element={<Statistics/>}/>
          <Route path='/explaination' element={<Explaination/>}/>
          <Route path='/usertesting' element={<UserTesting/>}/>
          <Route path='/newstart' element={<NewStart/>}/>
        </Routes>
      </Router>
    </div>
  )
}