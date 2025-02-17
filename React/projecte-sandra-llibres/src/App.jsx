import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./pages/inicio/Inicio";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />       
        <Routes>
          <Route path="/" element={<Inicio />} />
        </Routes> 
      </div>
    </BrowserRouter>
  );
}

export default App
