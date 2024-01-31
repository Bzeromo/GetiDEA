import React, { useState } from "react";
import { Text, Transformer } from "react-konva";

const TextComponent = ({ text, x, y, onTextChange, onDragEnd, onTextEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textBox, setTextBox] = useState(text);
  const [position, setPosition] = useState({ x, y });
  // const [text, setText] = useState(textProps.text);
  const [showInput, setShowInput] = useState(true);

  const handleDblClick = () => {
    setIsEditing(true);

    // 텍스트 입력을 위한 HTML 텍스트 입력 필드 생성
    const input = document.createElement("input");
    input.value = text;
    input.style.position = "absolute";
    input.style.top = textBox.absolutePosition().y + 90 + "px";
    input.style.left = textBox.absolutePosition().x + 140 + "px";
    input.style.width = textBox.width() + 20 + "px";

    document.body.appendChild(input);

    input.focus();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        onTextChange(e.target.value);
        setIsEditing(false);
        document.body.removeChild(input);
      }
    });
  };
  const handleDragEnd = (e) => {
    // 드래그 종료 시 새로운 위치 정보로 상태 업데이트
    const newPos = { x: e.target.x(), y: e.target.y() };
    const id = e.target.id();
    console.log(id)
    console.log("TEST + " + newPos.x)
    setPosition(newPos);
    // 부모 컴포넌트에 새 위치 정보 전달 (옵셔널)
    if (onDragEnd) {
      onDragEnd(newPos);
    }
  };
  

  return (
    <Text
      text={text}
      fontSize={20}
      draggable
      x={position.x}
      y={position.y}
      // onDragEnd={handleDragEnd}
      onDblClick={isEditing ? null : handleDblClick}
      ref={(node) => setTextBox(node)}
    />
  );
};

export default TextComponent;
