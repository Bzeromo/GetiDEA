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

const ImgComponent = ({ onImageSelect, isSelected }) => {
    const images = [
      "/img/강아지.jpg",
      "/img/고양이.jpg",
      "/img/아기사슴.jpg",
      "/img/햄스터.jpg",
    ]; // 이미지 경로 목록
    const imageRef = useRef();
    const transformerRef = useRef();
  
    useEffect(() => {
      if (isSelected) {
        transformerRef.current.nodes([imageRef.current]);
        transformerRef.current.getLayer().batchDraw();
      }
    }, [isSelected]);
  
    return (
      <div>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`image-${index}`}
            onClick={() => onImageSelect(src)}
            style={{ width: "100px", cursor: "pointer" }}
          />
        ))}
      </div>
    );
  };

  export default ImgComponent;