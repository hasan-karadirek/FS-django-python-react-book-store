import React from "react";
import { Route,Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";



const App : React.FC= () => {
  return (
    
      <Routes>
        <Route path="/" element={<MainLayout/>} /> 
      </Routes>
    
  );
};

export default App;
