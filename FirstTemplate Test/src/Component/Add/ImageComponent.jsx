import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const ImageComponent = ({
  src,
  x,
  y,
  width,
  height,
  rotation,
  scaleX,
  scaleY,
  color,
}) => {
  const [image] = useImage(src);

  if (width && height) {
    return (
      <Image
        image={image}
        x={x}
        y={y}
        width={width}
        height={height}
        rotation={rotation}
        scaleX={scaleX}
        scaleY={scaleY}
        color={color}
        // draggable
      />
    );
  }
  return null;
};

export default ImageComponent;
