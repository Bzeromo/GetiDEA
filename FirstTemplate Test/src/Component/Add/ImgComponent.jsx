import React, { useState, useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

const ImgComponent = ({
  imageSrc,
  x,
  y,
  ty,
  isSelected,
  onSelect,
  maxWidth = 200,
  maxHeight = 200,
  id,
}) => {
  const [img, status] = useImage(imageSrc);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const imgRef = useRef(null);
  const transformerRef = useRef(null);

  useEffect(() => {
    if (img && status === "loaded") {
      // 이미지 로딩 완료 시 크기 조정 로직 실행
      const aspectRatio = img.width / img.height;
      let newWidth, newHeight;

      if (img.width > img.height || img.width > maxWidth) {
        newWidth = maxWidth;
        newHeight = maxWidth / aspectRatio;
      } else if (img.height > maxHeight) {
        newHeight = maxHeight;
        newWidth = maxHeight * aspectRatio;
      } else {
        newWidth = img.width;
        newHeight = img.height;
      }

      if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = newWidth / aspectRatio;
      }
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
      }

      setSize({ width: newWidth, height: newHeight });
    }
  }, [img, status, maxWidth, maxHeight]);

  useEffect(() => {
    if (isSelected && transformerRef.current && imgRef.current) {
      // 이미지가 선택되었을 때 Transformer 설정
      transformerRef.current.nodes([imgRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      {img && (
        <Image
          image={img}
          id={id}
          x={x}
          y={y}
          ty={ty}
          width={size.width}
          height={size.height}
          ref={imgRef}
          draggable
          onClick={onSelect}
        />
      )}
      {isSelected && (
        <Transformer
          ref={transformerRef}
          keepRatio={true}
          centeredScaling={true}
        />
      )}
    </>
  );
};

export default ImgComponent;
