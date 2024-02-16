import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { Text, Transformer } from "react-konva";

interface TextComponentProps {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  onTextChange: (newText: string) => void;
  onDragEnd: () => void;
  isSelected: boolean;
  textProps: any; // textProps의 타입을 정확히 지정해야 합니다.
  onSelect: () => void;
  selectedId: string;
  setSelectedId: (id: string) => void;
}

const TextComponent: React.FC<TextComponentProps> = ({
  text,
  x,
  y,
  fontSize,
  onTextChange,
  onDragEnd,
  isSelected,
  textProps,
  onSelect,
  selectedId,
  setSelectedId,
}) => {
  const [textBox, setTextBox] = useState(text);
  const textRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTextBox(textRef.current?.text() || ""); // 옵셔널 체이닝 사용
  }, []);

  useEffect(() => {
  }, [selectedId]);

  const handleTextSelect = (id: string) => {
    setSelectedId(id);
  };

  useEffect(() => {
    if (isSelected && transformerRef.current && textRef.current) {
      transformerRef.current.nodes([textRef.current]);
      const layer = textRef.current.getLayer();
      if (layer) {
        layer.batchDraw();
      }
    }
  }, [isSelected]);

  const handleDblClick = () => {
    if (!textBox) {
      console.error("TextBox가 아직 설정되지 않았습니다.");
      return;
    }

    setIsEditing(true);

    const input = document.createElement("input");
    input.value = textProps.text;
    input.style.position = "absolute";
    input.style.top =
      (textRef.current?.getAbsolutePosition().y || 0) + 90 + "px"; // 옵셔널 체이닝 사용
    input.style.left =
      (textRef.current?.getAbsolutePosition().x || 0) + 140 + "px"; // 옵셔널 체이닝 사용
    input.style.width = (textRef.current?.width() || 0) + 20 + "px"; // 옵셔널 체이닝 사용

    document.body.appendChild(input);

    input.focus();

    input.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onTextChange((e.target as HTMLInputElement).value); // 수정된 부분
        setIsEditing(false);
        document.body.removeChild(input);
      }
    });
  };

  const handleSelectedId = (id: string) => {
    setSelectedId(id);
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
        style={{ zIndex: 100 }}
        onClick={onSelect}
        onDblClick={isEditing ? undefined : handleDblClick}
        onTap={() => handleSelectedId(textProps.id)}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
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
