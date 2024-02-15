import "./App.css";
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import MyDrawing from "./Component/MyDrawing";
import MyDrawingFirst from "./Component/MyDrawingFirst";
import MyDrawingFirstTest from "./Component/MyDrawingFirstTest Save Data Test";
import MyDrawingSecond from "./Component/MyDrawingSecond";
import MyDrawingThird from "./Component/MyDrawingThird";
import TutorialTest from "./Component/TutorialTest";


function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/board"  element={<MyDrawing />} />
        <Route path="/board/1"  element={<MyDrawingFirst />} />
        <Route path="/board/1/test"  element={<MyDrawingFirstTest />} />
        <Route path="/board/2"  element={<MyDrawingSecond />} />
        <Route path="/board/3"  element={<MyDrawingThird />} />

        <Route path="/board/tutorial"  element={<TutorialTest />} />
        
      </Routes>
    </BrowserRouter>
   
   
  );
}

export default App;
