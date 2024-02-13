import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const Template1TextComponenet = ({
  textResult,
  textPosX,
  textPosY,
  fontSize,
  textProps,
}) => {
  const [textResult, setTextResult] = useState(text);

    return (
      <Text
        text={textResult}
        x={textPosX}
        y={textPosY}
        fontSize={fontSize}
        {...textProps}
      />
    );
};

export default Template1TextComponenet;
