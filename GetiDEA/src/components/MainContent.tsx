import React from 'react';
import api from '../api';
import { useState,useEffect } from 'react';


interface User {
  userName: string;
  userEmail: string; // API 응답의 오타가 의도된 것이라면 여기도 같게 유지
  profileImage: string;
}

type UserResponse = User[];

const MainContent: React.FC = () => {

  
  const date = new Date();

  const [userName, setUserName] = useState<string>('');

  
  useEffect(() => {
    const fetchData = async () => {
    try {
      const response = await api.get<UserResponse>(`/api/user/search?userEmail=${localStorage.getItem('userEmail')}`);
      setUserName(response.data[0].userName);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
    };
    fetchData();
}, []);


  return (
    
    <div className="relative ml-24 flex justify-center bg-gradient-to-r items-center rounded-md from-main to-gradient_color shadow-[rgba(0,_0,_0,_0.08)_8px_8px_48px_8px] z-0" style={{ width: '1000px', height: '250px' }}>
    
      <div style={{ width: '100%', height: '100%' }}>
         {/* 현재 날짜 */}
          <h1 className="subpixel-antialiased mt-12 mb-16 ml-20 font-poppins font-regular text-opacity-75 text-white text-base rotate-[-0.03deg]">{date.toLocaleString('en-US', {month: 'long'})} {date.getDate()}, {date.getFullYear()}</h1>

          {/* 로그인한 유저의 이름이 포함된 환영문구 */}
          <h1 className=" subpixel-antialiased mt-10 ml-20 font-N font-bold text-white text-[32px] rotate-[-0.03deg]">{userName} 님, 안녕하세요</h1>
          <h1 className="subpixel-antialiased ml-20 font-Nanum font-regular text-opacity-75 text-white text-base rotate-[-0.03deg]">Get iDEA와 함께 좋은 아이디어를 구상해보세요</h1>
      </div>
     
      {/* 이미지 */}
      <div className=" object-bottom rounded-md"  style={{ width: '70%', height: '100%' }}>
       <img src="/talking.png" alt="talking_image" />
      </div>
    </div>
    
  );
};

export default MainContent;
