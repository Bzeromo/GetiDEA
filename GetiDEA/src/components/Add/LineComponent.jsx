import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Transformer,
  Line,
} from "react-konva";

const LineComponent = ({ lineProps, isSelected, onSelect, onChange }) => {
    const lineRef = useRef();
    const transformerRef = useRef();
  
    useEffect(() => {
      if (isSelected) {
        transformerRef.current.nodes([lineRef.current]);
        transformerRef.current.getLayer().batchDraw();
      }
    }, [isSelected]);
  
    return (
      <>
        <Line ref={lineRef} {...lineProps} draggable onClick={onSelect} />
        {isSelected && <Transformer ref={transformerRef} />}
      </>
    );
  };

  export default LineComponent;