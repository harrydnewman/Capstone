import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import BackendTest from './pages/BackendTest';
import Photo from './pages/Photo'


export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/backendTest' element={<BackendTest/>}/>
          <Route path='/photo' element={<Photo/>}/>
        </Routes>
      </Router>
    </div>
  )
}