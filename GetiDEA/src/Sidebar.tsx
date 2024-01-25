import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="h-full w-80 bg-side ">

      {/* 로고 이미지*/}
      <div className=" mt-10 p-4 flex justify-center items-center">
       <img src="/logo3.png" alt="" className="object-cover h-24 w-24"/>
      </div>

      {/* 로고 이름 */}
      <div className="text-xl text-center mb-5 font-extrabold p-4 font-poppins">
        Good Eye Deer
      </div>

      {/* 프로젝트 검색 바 */}
    
      <div className="text-xl mb-10 font-bold p-4 text-left flex justify-center items-center ">
        <input type="search" name="search" placeholder="프로젝트 검색" className="bg-white p-4 rounded-xl drop-shadow-lg text-base font-regular focus:outline-none"  />
      
        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        
  </button>
          {/* <textarea name="" id="" placeholder='프로젝트 검색' className='resize-none bg-white p-4 rounded-xl drop-shadow-lg'>
            
          </textarea> */}
        
      
      </div>

      {/* 네비게이션 메뉴 */}
      <ul>
        <li className="p-3 hover:bg-gray-700 cursor-pointer text-center">Home</li>
        <li className="p-3 hover:bg-gray-700 cursor-pointer text-center">Profile</li>
        <li className="p-3 hover:bg-gray-700 cursor-pointer text-center">Settings</li>
        {/* 추가 메뉴 아이템 */}
      </ul>
    </div>
  );
};

export default Sidebar;
