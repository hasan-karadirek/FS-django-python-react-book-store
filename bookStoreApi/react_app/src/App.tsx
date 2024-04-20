import React from "react";
import { Route,Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";



const App : React.FC= () => {
  return (
    
      <Routes>
        <Route path="/" element={<MainLayout/>} >
          <Route index element={<Home/>}/>
          
          </Route> 
      </Routes>
    
  );
};

export default App;
