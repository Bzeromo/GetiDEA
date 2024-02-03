import React from 'react';
import { useState, useRef, useEffect} from 'react';
import ProfileModal from './ProfileModal';
import axios from 'axios';

interface UserResponse {
  userId: number;
  userName: string;
  userEmail: string;
  profileImage: string;
  provider: string;
  accessToken: string | null;
}


const Topbar: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [profileImage, setprofileImage] = useState<string>("")

  const dropdownRef = useRef<HTMLDivElement>(null);

  const DropDownClickOutside = (event: MouseEvent) => {
    console.log("외부 클릭!!");
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', DropDownClickOutside);
    return () => document.removeEventListener('mousedown', DropDownClickOutside);
    
  }, [isOpen]);

  useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.get<UserResponse>('http://localhost:8080/user/userid=1');
        setUserName(response.data.userName); // userName 필드만 추출
        setprofileImage(response.data.profileImage); // profileImage 필드만 추출
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
    };
    fetchData();
}, []);

  const openModal = () => {
    setIsOpen(false);
    setIsModalOpen(true);
  }
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full h-20 bg-red-500">

        <ProfileModal isOpen={isModalOpen} closeModal={closeModal}></ProfileModal>

        <div className='flex flex-row absolute right-28 mt-5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mt-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                <div className="inline-flex items-center cursor-pointer justify-center object-cover w-10 h-10 ml-4 text-base text-white bg-[#81A4AD] rounded-full" onClick={() => setIsOpen(!isOpen)}>
                   <img src={profileImage} alt="" className='rounded-full ' />
                </div>
                <span className='ml-2 mt-2 font-Nanum font-semibold'>{userName}</span>
                {isOpen && (
                <div className="absolute ml-8 top-10 w-36 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10" ref={dropdownRef}>
                  <div className="py-1">
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={openModal}>프로필 수정</div>
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
