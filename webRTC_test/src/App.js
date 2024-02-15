import "./App.css";
import { BrowserRouter,Route, Routes } from "react-router-dom";
import VideoCall from "./Component/VideoCall";
// import Home from "./Component/Home";

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/"  element={<VideoCall />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
