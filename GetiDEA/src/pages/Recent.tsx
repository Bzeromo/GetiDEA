// App.tsx
import React from 'react';
import { useState,useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../components/TopBar';

const Recent: React.FC = () => {

  const [isSelected, setIsSelected] = useState<boolean[]>( Array(4).fill(false));
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownsOpen, setDropdownsOpen] = useState<boolean[]>(new Array(4).fill(false));

  // 북마크 관련 함수
  const select = (idx: number): void => {
    const arr = [...isSelected]; // 기존 배열의 상태를 복사
      arr[idx] = !arr[idx];
      setIsSelected(arr);
    };
    
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 프로젝트 메뉴 드롭다운 함수
   const menuDropdown = (index: number) => {
    setDropdownsOpen(prevState => 
      prevState.map((item, idx) => idx === index ? !item : item)
    );
  };

  // 프로필 드롭다운 함수
  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  // 외부 클릭 처리 함수
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setDropdownsOpen(new Array(dropdownsOpen.length).fill(false));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen,dropdownsOpen]); // 종속성 배열에 isOpen 추가

  return (
    <div className="flex  min-h-screen  flex-col bg-gray-100">

      <Topbar/>
      <div className="flex  relative  ml-28">


        {/* 검색바 */}
        <div className="flex relative">
          <input
            className="rotate-[-0.03deg] font-NanumGothic appearance-none border-[1px] pl-12  border-line_gray hover:border-light_gray transition-colors rounded-3xl w-full  py-3 px-4 text-black leading-tight focus:outline-none focus:ring-purple-600 focus:border-main focus:shadow-outline"
            id="username"
            type="text"
            placeholder="검색"
          />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-4 top-3 text-gray">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>

        </div>  
      </div>
       

        <div className='mt-10 ml-28 font-Nanum rotate-[-0.03deg] font-semibold text-xl'>최근 작업</div>

        <div className=' flex flex-row flex-wrap gap-16 ml-32 mt-12'>

          {/* 새 프로젝트 생성 */}
          <Link to="/templateSelect" className='flex flex-col group justify-center items-center cursor-pointer duration-500 w-64 h-[300px] bg-[#B8D8DC] rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px] '>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 place-self-center mt-16 text-gray">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

              <span className='self-center mt-16 font-Nanum text-xl text-gray font-semibold rotate-[-0.03deg]'>새 프로젝트</span>
          </Link>

          {/* 최근 작업 프로젝트 */}
            <div className='flex flex-col group  w-64 h-[300px] bg-white cursor-pointer  hover:bg-line_gray duration-700 rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px] ' >
            
              <div className='flex flex-row w-full'>
                <svg onClick={()=>select(1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isSelected[1]?"w-6 h-6 ml-3 mt-3 self-start fill-main cursor-pointer text-main"
                :"w-6 h-6 ml-3 mt-3 self-start invisible group-hover:visible  hover:text-main cursor-pointer text-gray"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>

                <svg onClick={() => menuDropdown(1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-44 mt-2 invisible group-hover:visible hover:text-main cursor-pointer  text-gray">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                {dropdownsOpen[1] && (
                <div className="absolute ml-52  w-28 px-2 text-black mt-10 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" ref={dropdownRef}>
                  <div className="py-1">
                    <a href="/" className=" px-4 py-2 flex flex-row text-sm text-gray-700 hover:bg-gray-100 rotate-[-0.03deg]">
                      수정</a>
                    <a href="/" className="flex flex-row px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rotate-[-0.03deg]">
                      이동</a>
                    <a href="/" className=" flex flex-row px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rotate-[-0.03deg]">
                      삭제</a>
                  </div>
                </div>
                 )}
              </div>

              <img src="/project_image1.png" alt="" className='w-44 h-44 self-center' />
              <span className='self-center mt-5 font-Nanum text-xl font-semibold rotate-[-0.03deg]'>프로젝트 1</span>
              <span className='self-center mt-1 font-Nanum text-sm font-regular text-gray invisible group-hover:visible rotate-[-0.03deg]'>2024-01-30 수정</span>
            </div>

            <div className='flex flex-col group  w-64 h-[300px] bg-white cursor-pointer  hover:bg-line_gray duration-700  rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px] '>
            
              <div className='flex flex-row w-full'>
                  <svg onClick={()=>select(2)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isSelected[2]?"w-6 h-6 ml-3 mt-3 self-start fill-main cursor-pointer text-main"
                      :"w-6 h-6 ml-3 mt-3 self-start invisible group-hover:visible  hover:text-main cursor-pointer text-gray"}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>

                <svg  onClick={() => menuDropdown(2)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-44 mt-2 invisible group-hover:visible hover:text-main cursor-pointer  text-gray">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                {dropdownsOpen[2] && (
                <div className="absolute ml-52  w-28 px-2 text-black mt-10 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" ref={dropdownRef}>
                  <div className="py-1">
                    <a href="/" className=" px-4 py-2 flex flex-row text-sm text-gray-700 hover:bg-gray-100 rotate-[-0.03deg]">
                      수정</a>
                    <a href="/" className="flex flex-row px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rotate-[-0.03deg]">
                      이동</a>
                    <a href="/" className=" flex flex-row px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rotate-[-0.03deg]">
                      삭제</a>
                  </div>
                </div>
                 )}
              </div>

              <img src="/project_image2.png" alt="" className='w-full h-44 self-center group-hover:text-gray' />
              <span className='self-center mt-5 font-Nanum text-xl font-semibold rotate-[-0.03deg]'>프로젝트 2</span>
              <span className='self-center mt-1 font-Nanum text-sm font-regular text-gray invisible group-hover:visible rotate-[-0.03deg]'>2024-01-29 수정</span>
          </div>

          <div className='flex flex-col group  w-64 h-[300px] bg-white cursor-pointer hover:bg-line_gray duration-700  rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px] '>
            
            <div className='flex flex-row w-full'>
                <svg onClick={()=>select(3)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isSelected[3]?"w-6 h-6 ml-3 mt-3 self-start fill-main cursor-pointer text-main"
                :"w-6 h-6 ml-3 mt-3 self-start invisible group-hover:visible  hover:text-main cursor-pointer text-gray"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>

              <svg onClick={() => menuDropdown(3)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-44 mt-2 invisible group-hover:visible hover:text-main cursor-pointer  text-gray">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {dropdownsOpen[3] && (
                <div className="absolute ml-52  w-28 px-2 text-black mt-10 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" ref={dropdownRef}>
                  <div className="py-1">
                    <a href="/" className=" px-4 py-2 flex flex-row text-sm text-gray-700 hover:bg-gray-100 rotate-[-0.03deg]">
                      수정</a>
                    <a href="/" className="flex flex-row px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rotate-[-0.03deg]">
                      이동</a>
                    <a href="/" className=" flex flex-row px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rotate-[-0.03deg]">
                      삭제</a>
                  </div>
                </div>
                 )}
            </div>

            <img src="/project_image3.png" alt="" className='w-full h-44 self-center' />
            <span className='self-center mt-5 font-Nanum text-xl font-semibold rotate-[-0.03deg]'>프로젝트 3</span>
            <span className='self-center mt-1 font-Nanum text-sm font-regular text-gray invisible group-hover:visible rotate-[-0.03deg]'>2024-01-29 수정</span>
          </div>

  
            
          {/* 아래 빈 공간 */}
           <div className='w-full h-10'></div>
            
        </div>
      </div>
  );
};

export default Recent;
