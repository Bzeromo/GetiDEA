import React, { useRef, useEffect } from "react";
import { Rect, Circle, RegularPolygon, Transformer } from "react-konva";
import Konva from "konva";

interface ShapeProps {
  type: "Rect" | "Circle" | "RegularPolygon";
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius: number;
  sides: number;
  // 기타 Konva 도형 속성들...
}

interface ShapeComponentProps {
  shapeProps: ShapeProps;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: ShapeProps) => void;
}

const ShapeComponent: React.FC<ShapeComponentProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = useRef<any>(null);

  const transformerRef = useRef<any>(null);

  useEffect(() => {
    if (transformerRef.current) {
      const transformer: any = transformerRef.current;
      transformer.nodes([shapeRef.current]);
    }
  }, [isSelected]);

  const renderShape = () => {
    const commonProps = {
      ...shapeProps,
      draggable: true,
      onClick: onSelect,
      onTransformEnd: () => {
        if (shapeRef.current) {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            ...(shapeProps.width !== undefined && {
              width: Math.max(5, node.width() * scaleX),
            }),
            ...(shapeProps.height !== undefined && {
              height: Math.max(5, node.height() * scaleY),
            }),
          });
        }
      },
    };

    switch (shapeProps.type) {
      case "Rect":
        return <Rect {...commonProps} ref={shapeRef} />;
      case "Circle":
        return <Circle {...commonProps} ref={shapeRef} />;
      case "RegularPolygon":
        return <RegularPolygon {...commonProps} ref={shapeRef} />;
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
