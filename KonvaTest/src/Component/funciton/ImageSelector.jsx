// ImageSelector.jsx
import React from "react";

const ImageSelector = ({ onImageSelect }) => {
  const imageOptions = [
    "/img/강아지.jpg",
    "/img/고양이.jpg",
    "/img/아기사슴.jpg",
    "/img/햄스터.jpg",
    "/img/card1.png",
    //Template 1번 : bubble chat 관련 이미지
    "/img/template1_bubble_chat/bubble_chat1.svg",
    "/img/template1_bubble_chat/bubble_chat2.svg",
    "/img/template1_bubble_chat/bubble_chat3.svg",
    "/img/template1_bubble_chat/bubble_chat4.svg",
    "/img/template1_bubble_chat/bubble_chat5.svg",
    "/img/template1_bubble_chat/bubble_chat6.svg",
    "/img/template1_bubble_chat/bubble_chat7.svg",
    "/img/template1_bubble_chat/bubble_chat8.svg",
    "/img/template1_bubble_chat/bubble_chat9.svg",
    "/img/template1_bubble_chat/bubble_chat10.svg",
    "/img/template1_bubble_chat/bubble_chat11.svg",
    "/img/template1_bubble_chat/bubble_chat12.svg",
    "/img/template1_bubble_chat/bubble_chat13.svg",
    "/img/template1_bubble_chat/bubble_chat14.svg",
    "/img/template1_bubble_chat/bubble_chat15.svg",
    "/img/template1_bubble_chat/bubble_chat16.svg",
    "/img/template1_bubble_chat/bubble_chat17.svg",
    "/img/template1_bubble_chat/bubble_chat18.svg",
    "/img/template1_bubble_chat/bubble_chat19.svg",
    "/img/template1_bubble_chat/bubble_chat20.svg",
    "/img/template1_bubble_chat/bubble_chat21.svg",
    "/img/template1_bubble_chat/bubble_chat22.svg",
    "/img/template1_bubble_chat/bubble_chat23.svg",
    "/img/template1_bubble_chat/bubble_chat24.svg",
    "/img/template1_bubble_chat/bubble_chat25.svg", 
    "/img/template1_bubble_chat/bubble_chat26.svg",
    "/img/template1_bubble_chat/bubble_chat27.svg",
    "/img/template1_bubble_chat/bubble_chat28.svg",
    "/img/template1_bubble_chat/bubble_chat29.svg",
    "/img/template1_bubble_chat/bubble_chat30.svg",
    "/img/template1_bubble_chat/bubble_chat31.svg",
    "/img/template1_bubble_chat/bubble_chat32.svg",
    "/img/template1_bubble_chat/bubble_chat33.svg",
    "/img/template1_bubble_chat/bubble_chat34.svg",
    
    //템블릿 2번 : 6hat
    "/img/template2_6hat/1_white_hat.svg",
    "/img/template2_6hat/2_white_hat.svg",
    "/img/template2_6hat/3_white_hat.svg",
    "/img/template2_6hat/4_white_hat.svg",
    "/img/template2_6hat/5_green_hat.svg",
    "/img/template2_6hat/6_blue_hat.svg",



    // "/img/새 폴더/bubble_chat - 복사본 (1).svg",
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
