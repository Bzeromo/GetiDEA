import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Rect,
  Circle,
  RegularPolygon,
  Transformer,
} from "react-konva";

const ShapeComponent = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = useRef();
    const transformerRef = useRef();
  
    useEffect(() => {
      if (isSelected) {
        // 현재 도형에 Transformer 연결
        transformerRef.current.nodes([shapeRef.current]);
        transformerRef.current.getLayer().batchDraw();
      }
    }, [isSelected]);
  
    const renderShape = () => {
      const commonProps = {
        ref: shapeRef,
        ...shapeProps,
        draggable: true,
        onClick: onSelect,
  
        onTransformEnd: () => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
  
          node.scaleX(1);
          node.scaleY(1);
  
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY, 5),
          });
        },
      };
  
      switch (shapeProps.type) {
        case "Rect":
          return <Rect {...commonProps} ref={shapeRef} />;
        case "Circle":
          return <Circle {...commonProps} ref={shapeRef}/>;
        case "RegularPolygon":
          return <RegularPolygon {...commonProps} ref={shapeRef}/>;
        default:
          return null;
      }
    };
  
    return (
      <>
        {renderShape()}
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

  export default ShapeComponent;