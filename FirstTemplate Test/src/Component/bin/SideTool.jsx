import React, { Component, useState } from "react";

const SideTool = () => {
  const [selectShape, setSelectShape] = useState(null);

  const select = () => {
    const selectOne = selectShape;
    // if()
  }

  return (
    <>
      <div className="SideTool">
        SideTool
        <div>
          <div>선택</div>
          <div>그리기</div>
          <div>모형</div>
          <div>메모</div>
          <ul>
            <li>circle</li>
            <li>square</li>
            <li>triangle</li>
          </ul>
          <div>선</div>
          <ul>
            <li>점선</li>
            <li>실선</li>
            <li>아무개선</li>
          </ul>
          <div>텍스트박스</div>
        </div>
      </div>
    </>
  );
};

export default SideTool;