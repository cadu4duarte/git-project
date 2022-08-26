import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Main} from "./pages/Main";
import {Repositorio} from "./pages/Repositorio";
import GlobalStyle from "./styles/global"
 

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route exact path="/repositorio/:repositorio" element={<Repositorio/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
