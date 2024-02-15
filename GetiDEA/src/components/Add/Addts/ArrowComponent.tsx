import React, { useRef, useEffect } from "react";
import { Arrow, Transformer } from "react-konva";

interface ArrowComponentProps {
  lineProps: {
    points: number[];
    // 다른 Arrow 프로퍼티들 추가
  };
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: object) => void;
}

const ArrowComponent: React.FC<ArrowComponentProps> = ({
  lineProps,
  isSelected,
  onSelect,
  onChange,
}) => {
  const lineRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current) {
      transformerRef.current.nodes([lineRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Arrow ref={lineRef} {...lineProps} draggable onClick={onSelect} />
      {isSelected && transformerRef.current && (
        <Transformer ref={transformerRef} />
      )}
    </>
  );
};

export default ArrowComponent;
