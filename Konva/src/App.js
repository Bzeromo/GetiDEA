import "./App.css";
import DrawingBoard from "./Component/DrawingBoard";
import DrawingBoard2 from "./Component/DrawingBoard2";
import DrawingBoardTest from "./Component/DrawingBoardTest";
import MyDrawing from "./Component/MyDrawing";
import SideTool from "./Component/SideTool";
import Test1 from "./Component/Test1";
import Test2 from "./Component/Test2";
import Test3 from "./Component/Test3";
import Test4 from "./Component/Test4";

function App() {
  return (
    <div className="App">
      {/* <SideTool className="1" /> */}
      {/* <Test1 /> */}
      {/* <Test2 /> */}
      {/* <DrawingBoard /> */}
      {/* <DrawingBoardTest /> */}
      {/* <Test3 /> */}
      {/* <DrawingBoard2 /> */}
      <MyDrawing className="MyDrawing" />
      {/* <Test4 /> */}
    </div>
  );
}

export default App;
