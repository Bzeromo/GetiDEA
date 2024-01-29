import "./App.css";
import { BrowserRouter,Route, Routes } from "react-router-dom";
import MyDrawing from "./Component/MyDrawing";
import Home from "./Component/Home";

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/board"  element={<MyDrawing />} />
      </Routes>
    </BrowserRouter>
   
   
  );
}

export default App;
