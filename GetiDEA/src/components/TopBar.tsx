import React from 'react';
import { useState, useRef, useEffect} from 'react';
import ProfileModal from './ProfileModal';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface User {
  userName: string;
  userEmail: string; // API 응답의 오타가 의도된 것이라면 여기도 같게 유지
  profileImage: string;
}

type UserResponse = User[];

const Topbar: React.FC = () => {
  
  const auth = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');

  const dropdownRef = useRef<HTMLDivElement>(null);

  const DropDownClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', DropDownClickOutside);
    return () => document.removeEventListener('mousedown', DropDownClickOutside);
    
  }, [isOpen]);

  useEffect(() => {

    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    const fetchData = async () => {
      try {
        const response = await api.get<UserResponse>(`/api/user/search?userEmail=${localStorage.getItem('userEmail')}`);
        const userName = response.data[0].userName;
        const userEmail = response.data[0].userEmail;
        const profileImage = response.data[0].profileImage;
        setUserName(userName); // userName 필드만 추출
        setUserEmail(userEmail); 
        setProfileImage(profileImage); 
        localStorage.setItem('userName', response.data[0].userName);
        localStorage.setItem('userEmail', response.data[0].userEmail);
        localStorage.setItem('profileImage', response.data[0].profileImage);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
}, [profileImage,userName]);
  
  const openModal = () => {
    setIsOpen(false);
    setIsModalOpen(true);
  }
  const closeModal = () => setIsModalOpen(false);

  const logout = () => {
    auth?.logout();
    navigate("/");
  }
  return (
    <div className="w-full h-20 bg-red-500">

        <ProfileModal isOpen={isModalOpen} closeModal={closeModal} profileImage={profileImage} setProfileImage={setProfileImage}></ProfileModal>

        <div className='flex flex-row absolute right-28 mt-5'>
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mt-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg> */}
                <div className="inline-flex items-center cursor-pointer justify-center object-cover w-10 h-10 ml-4 text-base text-white border-[1px] border-line_gray rounded-full" onClick={() => setIsOpen(!isOpen)}>
                   <img src={profileImage} alt="" className='rounded-full ' />
                </div>
                
                {isOpen && (
                <div className="absolute ml-6 top-10 w-28 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10" ref={dropdownRef}>
                <div className="py-1">
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={openModal}> 설정</div>
                  <div onClick={logout} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">로그아웃</div>
                </div>
              </div>
                 )}
        </div>
    </div>
  );
};

export default Topbar;
