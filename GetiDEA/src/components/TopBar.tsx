import React from 'react';
import { useState, useRef, useEffect} from 'react';

const Topbar: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    console.log("외부 클릭!!");
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);


  return (
    <div className="w-full h-20 bg-red-500">
        <div className='flex flex-row absolute right-28 mt-5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mt-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                <div className="inline-flex items-center cursor-pointer justify-center w-10 h-10 ml-4 text-base text-white bg-[#81A4AD] rounded-full" onClick={() => setIsOpen(!isOpen)}>
                    TW
                </div>
                {isOpen && (
                <div className="absolute ml-8 top-10 w-36 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10" ref={dropdownRef}>
                  <div className="py-1">
                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">프로필 보기</a>
                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">설정</a>
                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">로그아웃</a>
                  </div>
                </div>
                 )}
        </div>
    </div>
  );
};

export default Topbar;
