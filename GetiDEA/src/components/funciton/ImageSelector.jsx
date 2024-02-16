// ImageSelector.jsx
import React from "react";

const ImageSelector = ({ onImageSelect }) => {
  const imageOptions = [
    // test 코드
    // "/img/강아지.jpg",
    // "/img/고양이.jpg",
    // "/img/아기사슴.jpg",
    // "/img/햄스터.jpg",

    // template 1 : bubble chat 관련 이미지
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
    "/img/template1_bubble_chat/bubble_chat_set_removebg.png",
    
    // template 2 : six hats 관련 이미지
    "/img/template2_6hats/template2_6hats.png",
    "/img/template2_6hats/hat1_white.svg",
    "/img/template2_6hats/hat2_red.svg",
    "/img/template2_6hats/hat3_yellow.svg",
    "/img/template2_6hats/hat4_black.svg",
    "/img/template2_6hats/hat5_green.svg",
    "/img/template2_6hats/hat6_blue.svg",

    // template 3 : check7 관련 이미지
    "/img/template3_check7/template3.png",
    "/img/template3_check7/bulb.svg",   
    // "/img/template3_check7/card1.png",
    // "/img/template3_check7/card2.png",
    // "/img/template3_check7/card3.png",
    // "/img/template3_check7/card4.png",
    // "/img/template3_check7/card5.png",
    // "/img/template3_check7/card6.png",
    // "/img/template3_check7/card7.png",
    // "/img/template3_check7/writing_area.png",

    // 여기에 더 많은 이미지 경로를 추가할 수 있습니다.
  ];

  return (
    <div className="image-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)', // 3열 그리드
      gap: '10px', // 그리드 간격
      padding: '10px', // 내부 여백
      maxWidth: '300px', // 최대 너비, 필요에 따라 조절
      maxHeight: '300px',
      backgroundColor: '#fff', // 배경색
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 효과
      borderRadius: '8px', // 테두리 둥글게
      overflowY: 'auto' // 세로 스크롤 활성화
    }}>
      {imageOptions.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Option ${index}`}
          onClick={() => {
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
