import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import BackendTest from './pages/BackendTest';
import Photo from './pages/Photo'
import Test from './pages/Test';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/backendTest' element={<BackendTest/>}/>
          <Route path='/photo' element={<Photo/>}/>
          <Route path='/test' element={<Test/>}/>
        </Routes>
      </Router>
    </div>
  )
}