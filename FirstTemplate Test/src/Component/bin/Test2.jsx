import React, { useEffect } from "react";
import Konva from "konva";

const Test2 = () => {
  useEffect(() => {
    // 스테이지를 생성합니다.
    var stage = new Konva.Stage({
      container: 'container2', // 수정: 컨테이너 id <div>
      width: 500,
      height: 500
    });

    // 레이어를 생성합니다.
    var layer = new Konva.Layer();

    // 모양 만들기
    var triangle = new Konva.Shape({
      sceneFunc: function(context) {
        context.beginPath();
        context.moveTo(20, 50);
        context.lineTo(220, 80);
        context.quadraticCurveTo(150, 100, 260, 170);
        context.closePath();

        // 특수 Konva.js 메서드
        context.fillStrokeShape(this);
      },
      fill: '#00D2FF',
      stroke: 'black',
      strokeWidth: 4
    });

    // 레이어에 모양을 추가합니다.
    layer.add(triangle);

    // 스테이지에 레이어를 추가합니다.
    stage.add(layer);

    // 이미지 그리기
    layer.draw();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 합니다.

  return (
    <div id="container2">
      {/* 스테이지를 그릴 컨테이너 */}
    </div>
  );
}

export default Test2;
