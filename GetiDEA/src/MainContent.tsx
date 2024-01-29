import React from 'react';

const MainContent: React.FC = () => {
  return (
    <div className="ml-24 flex justify-center bg-gradient-to-r items-center rounded-md from-main to-gradient_color drop-shadow-lg " style={{ width: '80%', height: '250px' }}>
     
      <div style={{ width: '100%', height: '100%' }}>
         {/* 현재 날짜 */}
          <h1 className="subpixel-antialiased mt-10 mb-20 ml-20 font-poppins font-normal text-opacity-75 text-white text-base">January 17, 2024</h1>

          {/* 로그인한 유저의 이름이 포함된 환영문구 */}
          <h1 className="subpixel-antialiased mt-10 ml-20 font-poppins font-semibold text-white text-4xl">정연우 님, 안녕하세요</h1>
          <h1 className="subpixel-antialiased ml-20 font-poppins font-normal text-opacity-75 text-white text-base">Good Eye Deer와 함께 좋은 아이디어를 구상해보세요</h1>
      </div>
     
      {/* 이미지 */}
      <div className=" object-bottom rounded-md" style={{ width: '70%', height: '100%' }}>
       <img src="/talking.png" alt="talking_image" />
      </div>
    </div>
  );
};

export default MainContent;
