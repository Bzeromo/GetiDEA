import "./App.css";
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import MyDrawing from "./Component/MyDrawing";
import MyDrawingFirst from "./Component/MyDrawingFirst";
// import MyDrawingSecond from "./Component/MyDrawingSecond";
import MyDrawingThird from "./Component/MyDrawingThird";


function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/board"  element={<MyDrawing />} />
        <Route path="/board/1"  element={<MyDrawingFirst />} />
        {/* <Route path="/board/2"  element={<MyDrawingSecond />} /> */}
        {/* <Route path="/board/3"  element={<MyDrawingThird />} /> */}
      </Routes>
    </BrowserRouter>
   
   
  );
}

export default App;
