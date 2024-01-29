import React, { useEffect } from "react";
import Konva from "konva";

const Test1 = () => {
  useEffect(() => {
    // 스테이지를 생성합니다.
    var stage = new Konva.Stage({
      container: 'container', // 컨테이너 id <div>
      width: 500,
      height: 500
    });

    // 레이어를 생성합니다.
    var layer = new Konva.Layer();

    // 모양 만들기
    var circle = new Konva.Circle({
      x: stage.width() / 2,
      y: stage.height() / 2,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4
    });

    // 레이어에 모양을 추가합니다.
    layer.add(circle);

    // 스테이지에 레이어를 추가합니다.
    stage.add(layer);

    // 이미지 그리기
    layer.draw();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 합니다.

  return (
    <>
    <div id="container">
      {/* 스테이지를 그릴 컨테이너 */}
    </div>
      </>
  );
}

export default Test1;
