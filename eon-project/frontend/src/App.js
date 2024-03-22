import NavBar from './components/Header';
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import './index.css';
// import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  Link
} from "react-router-dom";
import Homepage from './pages/Homepage';
import Upload from './pages/Upload';

function App() {

  const [query, setQuery] = useState("")

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm)
  }

  return (
    // <Router>
    //   <div className="flex ">
    //     <SearchBar onSearch={handleSearch}/>
    //     <NavBar/>
    //     <h1>{query}</h1>
    //   </div>
    //   <Routes>
    //     <Route path='/about' element={<About/>}/>
    //   </Routes>
    // </Router>

    <div className="App">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    
  );
}

function AppRoutes() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="upload" element={<Upload />} />
      </Routes>
    </>
  )
}


export default App;
