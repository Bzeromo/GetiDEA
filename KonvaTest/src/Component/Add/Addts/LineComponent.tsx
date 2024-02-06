import React, { useEffect, useRef } from "react";
import { Line, Transformer } from "react-konva";

interface LineComponentProps {
  lineProps: any; // lineProps의 타입을 정확히 지정해야 합니다.
  isSelected: boolean;
  onSelect: () => void;
}

const LineComponent: React.FC<LineComponentProps> = ({
  lineProps,
  isSelected,
  onSelect,
}) => {
  const lineRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current && lineRef.current) {
      transformerRef.current.nodes([lineRef.current]);
      const layer = lineRef.current.getLayer();
      if (layer) {
        layer.batchDraw();
      }
    }
  }, [isSelected]);

  return (
    <>
      <Line
        ref={lineRef}
        {...lineProps}
        draggable
        onClick={onSelect}
        onTap={onSelect}
      />
      {isSelected && <Transformer ref={transformerRef} />}
    </>
  );
};

export default LineComponent;
