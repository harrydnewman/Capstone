import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import BackendTest from './pages/BackendTest';
import Photo from './pages/Photo'
import Start from './pages/Start';
import Experience from './pages/Experience';
import Online from './pages/Online';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/backendTest' element={<BackendTest/>}/>
          <Route path='/photo' element={<Photo/>}/>
          <Route path='/start' element={<Start/>}/>
          <Route path='/experience' element={<Experience/>}/>
          <Route path='/online' element={<Online/>}/>
        </Routes>
      </Router>
    </div>
  )
}