import React, { useState, useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";

const TextComponent = ({
  text,
  x,
  y,
  onTextChange,
  onDragEnd,
  isSelected,
  // setIsSelected,
  textProps,
  onSelect,
  selectedId,
  setSelectedId,
  // transformerRef,
}) => {
  const [textBox, setTextBox] = useState(text);
  const [position, setPosition] = useState({ x, y });
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef(null);
  const transformerRef = useRef(null);

  useEffect(() => {
    setTextBox(textRef.current);
  }, []);

  useEffect(() => {
  }, [selectedId]);

  const handleTextSelect = (id) => {
    setSelectedId(id);
  };

  useEffect(() => {
    if (isSelected) {
      // 현재 도형에 Transformer 연결
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);


  const handleDblClick = () => {
    if (!textBox) {
      console.error("TextBox가 아직 설정되지 않았습니다.");
      return;
    }

    setIsEditing(true);

    // 텍스트 입력을 위한 HTML 텍스트 입력 필드 생성
    const input = document.createElement("input");
    input.value = textProps.text;
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

  const handleSelectedId = (id) => {
    setSelectedId(id); // 상태 업데이트 호출
    // 이 시점에서는 상태 업데이트가 아직 반영되지 않았기 때문에,
    // 아래의 로그에서는 업데이트 이전의 selectedId 값이 출력됩니다.
  };

  return (
    <>
      <Text
        ref={textRef}
        {...textProps}
        x={textProps.x}
        y={textProps.y}
        text={textProps.text}
        fontSize={textProps.fontSize}
        draggable
        ty="Text"
        style={{ zIndex: 100 }} // z-index 설정
        onClick={onSelect}
        onDblClick={isEditing ? null : handleDblClick}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            // 여기서 도형의 최소 크기 제한을 설정할 수 있습니다.
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default TextComponent;
