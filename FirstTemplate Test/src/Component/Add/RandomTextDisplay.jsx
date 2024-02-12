import React, { useState, useEffect } from "react";
import { Text } from "react-konva";
import bubbleChatPropertiesData from "../templateData/template1-position.json";
import randomWordsData from "../templateData/randomWords.json";

const RandomTextComponent = ({
  text,
  x,
  y,
  fontSize,
  textProps,
  arrangementType,
}) => {
  const inputWord = "이것은 당신의 아이디어";
  const plus = "&";
  const arrangementType1 = " ";
  const arrangementType2 = "\n";

  const [textResult, setTextResult] = useState(text);

  useEffect(() => {
    let result;
    if (arrangementType === 1) {
      result = text + arrangementType1 + plus + arrangementType1 + inputWord;
    } else if (arrangementType === 2) {
      result = inputWord + arrangementType2 + plus + arrangementType2 + text;
    } else {
      console.log("Wrong arrangementType!!");
    }
    setTextResult(result);
  }, [text, arrangementType]);

  return (
    <Text text={textResult} x={x} y={y} fontSize={fontSize} {...textProps} />
  );
};

const RandomTextDisplay = ({ activeIndex }) => {
    const [randomWords, setRandomWords] = useState([]);
    const [displayedIndices, setDisplayedIndices] = useState([]);
  
    useEffect(() => {
      function getRandomWords(words, count) {
        const selectedWords = [];
        while (selectedWords.length < count) {
          const randomIndex = Math.floor(Math.random() * words.length);
          const word = words[randomIndex];
          if (!selectedWords.includes(word)) {
            selectedWords.push(word);
          }
        }
        return selectedWords;
      }
  
      setRandomWords(getRandomWords(randomWordsData, 34));
    }, []);
  
    useEffect(() => {
      // 새로운 위치에만 텍스트를 표시합니다.
      const newIndices = activeIndex.filter((index) => !displayedIndices.includes(index));
      setDisplayedIndices((prevIndices) => [...prevIndices, ...newIndices]);
    }, [activeIndex, displayedIndices]);
  
    const bubbleChatProperties = Object.values(bubbleChatPropertiesData);
  
    return (
      <React.Fragment>
        {displayedIndices.map((index) => (
          <RandomTextComponent
            key={index}
            text={randomWords[index] || ""}
            x={bubbleChatProperties[index].textPosX}
            y={bubbleChatProperties[index].textPosY}
            fontSize={12}
            textProps={{ fill: "black" }}
            arrangementType={bubbleChatProperties[index].arrangementType}
          />
        ))}
      </React.Fragment>
    );
  };
  

export default RandomTextDisplay;
