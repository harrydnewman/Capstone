import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import BackendTest from './pages/BackendTest';


export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/backendTest' element={<BackendTest/>}/>
        </Routes>
      </Router>
    </div>
  )
}