import {   Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AjoutCandidature from "./pages/AjoutCandidature";

function App() {
  return (
    <Routes>
      

          <Route path="/" element={<Home />} />
          <Route path="/ajouter" element={<AjoutCandidature />} />
        
      
    </Routes>
  );
}

export default App;

