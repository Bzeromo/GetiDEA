// App.tsx
import React from 'react';
import { useState ,useEffect, useRef,ChangeEvent, KeyboardEvent} from 'react';
import { Link, useLocation  } from 'react-router-dom';
import Topbar from '../components/TopBar';
import axios from 'axios';
import FolderNameChange from '../components/FolderNameChange';
import Swal from 'sweetalert2';
const Folder: React.FC = () => {
    
    const [isSelected, setIsSelected] = useState<boolean[]>( Array(4).fill(false));
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownsOpen, setDropdownsOpen] = useState<boolean[]>(new Array(5).fill(false));
    const [name, setName] = useState<string|null>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const location = useLocation();

    useEffect(()=>{
      const queryParams = new URLSearchParams(location.search);
      setName(queryParams.get('name')); 
    })
    
    const showAlert = async() => {
      await Swal.fire({
           text: '폴더가 삭제되었습니다.',
         icon: 'success',
         confirmButtonText: '확인'
       });
     };

    

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
    
  //   useEffect(() => {
  //     const fetchData = async () => {
  //     try {
  //       const response = await axios.get<UserResponse>(`http://192.168.31.172:8080/api/user/search?userEmail=${localStorage.getItem('userEmail')}`);
  //       setUserName(response.data[0].userName);
  //       setUserEmail(response.data[0].userEmail); // userEmail 필드만 추출
  //       setprofileImage(response.data[0].profileImage); // userEmail 필드만 추출
  //     } catch (error) {
  //         console.error('Error fetching data: ', error);
  //     }
  //     };
  //     fetchData();
  // }, []);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    //폴더 삭제 함수
    const deleteFolder =async() => {

      try {
        const response = await axios.delete(`http://192.168.31.172:8080/api/folder/remove?userEmail=jungyoanwoo@naver.com&folderName=${name}`);

        showAlert();
        } catch (error) {
            console.error('업로드 실패:', error);
            alert('폴더 생성 실패.');
        }
    };

     

        // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get<UserResponse>('http://localhost:8080/user/userid=1');
  //       setUserName(response.data.userName); // userName 필드만 추출
  //     } catch (error) {
  //       console.error('Error fetching data: ', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="flex  min-h-screen  flex-col bg-gray-100">
      <Topbar/>
      <div className="flex  relative  ml-28">

        {/* 검색바 */}
        <div className="flex relative">
          <button onClick={deleteFolder}>삭제</button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-4 top-3 text-gray">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>

        </div>  
      </div>
       

        <div ref={containerRef} className='flex flex-row mt-10 ml-28 font-Nanum rotate-[-0.03deg] font-semibold text-xl'>
            {/* 폴더 이름 */}
          {name}
           

        </div>

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
                :"w-6 h-6 ml-3 mt-3 self-start invisible group-hover:visible hover:text-main cursor-pointer text-gray"}>
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

              <img src="/projectImage1.png" alt="" className='w-44 h-44 self-center' />
              <span className='self-center mt-5 font-Nanum text-xl font-semibold rotate-[-0.03deg]'>프로젝트 1</span>
              <span className='self-center mt-1 font-Nanum text-sm font-regular text-gray invisible group-hover:visible rotate-[-0.03deg]'>2024-01-30 수정</span>
            </div>

            <div className='flex flex-col group  w-64 h-[300px] bg-white cursor-pointer  hover:bg-line_gray duration-700  rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px] '>
            
              <div className='flex flex-row w-full'>
                  <svg onClick={()=>select(2)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isSelected[2]?"w-6 h-6 ml-3 mt-3 self-start fill-main cursor-pointer text-main"
                      :"w-6 h-6 ml-3 mt-3 self-start invisible group-hover:visible hover:text-main cursor-pointer text-gray"}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>

                <svg onClick={() => menuDropdown(2)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-44 mt-2 invisible group-hover:visible hover:text-main cursor-pointer  text-gray">
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

              <img src="/projectImage2.png" alt="" className='w-full h-44 self-center group-hover:text-gray' />
              <span className='self-center mt-5 font-Nanum text-xl font-semibold rotate-[-0.03deg]'>프로젝트 2</span>
              <span className='self-center mt-1 font-Nanum text-sm font-regular text-gray invisible group-hover:visible rotate-[-0.03deg]'>2024-01-29 수정</span>
          </div>

         

          <div className='flex flex-col group  w-64 h-[300px] bg-white cursor-pointer hover:bg-line_gray duration-700  rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px] '>
            
            <div className='flex flex-row w-full'>
                <svg onClick={()=>select(5)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isSelected[5]?"w-6 h-6 ml-3 mt-3 self-start fill-main cursor-pointer text-main"
                :"w-6 h-6 ml-3 mt-3 self-start invisible group-hover:visible hover:text-main cursor-pointer text-gray"}>
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

            <img src="/Checklist-bro.png" alt="" className='w-44 h-44 self-center' />
            <span className='self-center mt-5 font-Nanum text-xl font-semibold rotate-[-0.03deg]'>체크리스트</span>
            <span className='self-center mt-1 font-Nanum text-sm font-regular text-gray invisible group-hover:visible rotate-[-0.03deg]'>2024-01-24 수정</span>
          </div>

          <div className='flex flex-col group  w-64 h-[300px] bg-white cursor-pointer hover:bg-line_gray duration-700  rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px] '>
            
            <div className='flex flex-row w-full'>
                <svg onClick={()=>select(6)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isSelected[6]?"w-6 h-6 ml-3 mt-3 self-start fill-main cursor-pointer text-main"
                :"w-6 h-6 ml-3 mt-3 self-start invisible group-hover:visible  hover:text-main cursor-pointer text-gray"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>

              <svg onClick={() => menuDropdown(4)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-44 mt-2 invisible group-hover:visible hover:text-main cursor-pointer  text-gray">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>

              {dropdownsOpen[4] && (
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

            <img src="/talking.png" alt="" className='w-full h-44 self-center' />
            <span className='self-center mt-5 font-Nanum text-xl font-semibold rotate-[-0.03deg]'>아이디어 회의</span>
            <span className='self-center mt-1 font-Nanum text-sm font-regular text-gray invisible group-hover:visible rotate-[-0.03deg]'>2024-01-20 수정</span>
          </div>
            
          {/* 아래 빈 공간 */}
           <div className='w-full h-10'></div>
            
        </div>
      </div>
  );
};

export default Folder;
