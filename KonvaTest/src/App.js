import "./App.css";
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import MyDrawing from "./Component/MyDrawing";
import MyDrawingFirst from "./Component/MyDrawingFirst";
// import MyDrawingSecond from "./Component/MyDrawingSecond";
import MyDrawingThird from "./Component/MyDrawingThird";
import OpenViduComponent from "./Component/OpenViduComponent";
import VideoSession from "./Component/VideoSession";

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/board"  element={<MyDrawing />} />
        <Route path="/board/1"  element={<MyDrawingFirst />} />
        {/* <Route path="/board/2"  element={<MyDrawingSecond />} /> */}
        <Route path="/board/3"  element={<MyDrawingThird />} />
        <Route path="/openvidu" element={<OpenViduComponent />}/>
        <Route path="/videoSession" element={<VideoSession/>}/>
      </Routes>
    </BrowserRouter>
   
   
  );
}

export default App;
