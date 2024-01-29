import React, { useState } from 'react';
import { Text, Transformer } from 'react-konva';

const TextBox = ({ text, x, y, onTextChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textBox, setTextBox] = useState(null);
  const [position, setPosition] = useState({ x, y });

  const handleDblClick = () => {
    setIsEditing(true);

    // 텍스트 입력을 위한 HTML 텍스트 입력 필드 생성
    const input = document.createElement('input');
    input.value = text;
    input.style.position = 'absolute';
    input.style.top = textBox.absolutePosition().y + 90 + 'px';
    input.style.left = textBox.absolutePosition().x + 140 + 'px';
    input.style.width = textBox.width() + 20 + 'px';

    document.body.appendChild(input);

    input.focus();

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        onTextChange(e.target.value);
        setIsEditing(false);
        document.body.removeChild(input);
      }
    });
  };

  return (
    <Text
      text={text}
      fontSize={20}
      draggable
      x={position.x}
      y={position.y}
      onDragEnd={(e) => {
        // 드래그 종료 시 위치 정보 업데이트
        setPosition({ x: e.target.x(), y: e.target.y() });
      }}
      onDblClick={isEditing ? null : handleDblClick}
      ref={(node) => setTextBox(node)}
    />
  );
};

export default TextBox;
