import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "../pages/Login";
import Profil from "../pages/Profil";
import Home from "../pages/Home";
import Guard from "../components/guard";


const index = () =>{
  return (
    <Router>
      
       <Routes>
        <Route  element={<Guard/>}>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
        </Route>
        <Route path="/login" element={<Login />} />
       </Routes>
       
    </Router>
  );
};

export default index