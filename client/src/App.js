import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import ChoosePage from './Components/ChoosePage';

function App() {
  return (
      <Router>
        <div className='w-screen h-screen'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/choose' element={<ChoosePage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
