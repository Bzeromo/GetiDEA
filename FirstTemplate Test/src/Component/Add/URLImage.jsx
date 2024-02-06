import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const URLImage = ({ src, x = 50, y = 50, maxWidth = 100, maxHeight = 100, ...props }) => {
  const [image] = useImage(src, 'Anonymous');

  let width, height;

  if (image) {
    const aspectRatio = image.width / image.height;
    if (aspectRatio > 1) {
      // 너비가 높이보다 클 때
      width = Math.min(image.width, maxWidth);
      height = width / aspectRatio;
    } else {
      // 높이가 너비보다 클 때
      height = Math.min(image.height, maxHeight);
      width = height * aspectRatio;
    }
  }

  return <Image image={image} x={x} y={y} width={width} height={height} {...props} />;
};


export default URLImage;
