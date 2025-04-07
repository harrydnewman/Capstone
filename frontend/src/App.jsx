import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import Start from './pages/Start';
import Experience from './pages/Experience';
import Online from './pages/Online';
import Privacy from './pages/Privacy';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path='/backendTest' element={<BackendTest/>}/> */}
          {/* <Route path='/photo' element={<Photo/>}/> */}
          <Route path='/start' element={<Start/>}/>
          <Route path='/experience' element={<Experience/>}/>
          <Route path='/online' element={<Online/>}/>
          <Route path='/privacy' element={<Privacy/>}/>
        </Routes>
      </Router>
    </div>
  )
}