import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import Start from './pages/Start';
import Experience from './pages/Experience';
import Online from './pages/Online';
import Privacy from './pages/Privacy';
import Statistics from './pages/Statistics';
import Test from './pages/Test';
import Explaination from './pages/Explaination';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/start' element={<Start/>}/>
          <Route path='/experience' element={<Experience/>}/>
          <Route path='/online' element={<Online/>}/>
          <Route path='/privacy' element={<Privacy/>}/>
          <Route path='/statistics' element={<Statistics/>}/>
          <Route path='/test' element={<Test/>}/>
          <Route path='/explaination' element={<Explaination/>}/>
        </Routes>
      </Router>
    </div>
  )
}