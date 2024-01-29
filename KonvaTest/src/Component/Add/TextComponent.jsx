import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  RegularPolygon,
  Transformer,
  Line,
  Text,
  Arrow,
  Image,
} from "react-konva";

const TextComponent = (
    textProps,
    isSelected,
    onSelect,
    onChange,
    onTextEdit,
  ) => {
    const [text, setText] = useState("텍스트상자입니다");
    const [isEditing, setIsEditing] = useState(false);
    const [position, setPosition] = useState({ x: 50, y: 50 });

    const handleDoubleClick = () => {
      setIsEditing(true);
    };
  
    const handleChange = (e) => {
      setText(e.target.value);
    };
  
    const handleBlur = () => {
      setIsEditing(false);
    };

  return (
    <Text
    x={position.x}
    y={position.y}
    text={text}
    fontSize={20}
    draggable
    onDblClick={handleDoubleClick}
    onDragEnd={(e) => {
      setPosition({ x: e.target.x(), y: e.target.y() });
    }}
  />
  );
  };

  export default TextComponent;