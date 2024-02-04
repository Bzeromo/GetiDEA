// ImageSelector.jsx
import React from "react";

const ImageSelector = ({ onImageSelect }) => {
  const imageOptions = [
    "/img/강아지.jpg",
    "/img/고양이.jpg",
    "/img/아기사슴.jpg",
    "/img/햄스터.jpg",
    // 여기에 더 많은 이미지 경로를 추가할 수 있습니다.
  ];

  return (
    <div className="image-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)', // 3열 그리드
      gap: '10px', // 그리드 간격
      padding: '10px', // 내부 여백
      maxWidth: '300px', // 최대 너비, 필요에 따라 조절
      backgroundColor: '#fff', // 배경색
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 효과
      borderRadius: '8px', // 테두리 둥글게
    }}>
      {imageOptions.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Option ${index}`}
          onClick={() => {
            console.log(`Image clicked: ${src}`); // 클릭 로그
            onImageSelect(src);
          }}
          style={{
            width: '100%', // 이미지 너비를 그리드 칼럼 너비에 맞춤
            cursor: 'pointer',
            borderRadius: '4px', // 이미지 테두리 둥글게
            zIndex: '1000'
          }}
        />
      ))}
    </div>
  );
};

export default ImageSelector;
