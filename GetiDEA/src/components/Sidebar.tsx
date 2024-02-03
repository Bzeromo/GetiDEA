import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FolderModal from './FolderModal';

const Sidebar = () => {

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 폴더 늘어나면 수정해야되는 부분
  const [isSelected, setIsSelected] = useState<boolean[]>( [true,false,false,false,false]);
  
  const select = (idx: number): void => {
      const arr: boolean[] = Array(5).fill(false);
      arr[idx] = true;
      console.log(arr);
      setIsSelected(arr);
    };

  const clickProjects = () =>{
    navigate("/projects");
    select(3);
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex-shrink-0 min-h-svh w-80 bg-side scrollbar  scrollbar-thumb-red ">

      <FolderModal isOpen={isModalOpen} closeModal={closeModal}></FolderModal>

      <Link to="/home"  className='flex flex-row mt-16 mb-10 p-4 justify-center items-center' onClick={()=>{select(0)}}>
         {/* 로고 이미지*/}
        <div className=" flex justify-center items-center">
        <img src="/logo.svg" alt="" className="object-cover h-12 w-12 "/>
        </div>
        {/* 로고 이름 */}
        <div className="text-[28px] text-center pl-3 font-SCoreDream font-bold rotate-[-0.03deg]">
        Get iDEA
        </div>
      </Link>
     


      {/* 네비게이션 메뉴 */}
      <ul>
        {/* 홈 버튼 */}
        <li className="flex justify-center mb-3 ">
          <Link to="/home" className={!isSelected[0]?"flex flex-row text-center cursor-pointer  block  rounded py-4 px-4 hover:opacity-80 hover:text-blue  text-black ":"flex flex-row text-center  block  rounded py-4 px-4  text-blue "}
             onClick={() => select(0)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-5 opacity-80">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span className='inline-block font-Nanum font-medium text-base mr-32 opacity-80 rotate-[-0.03deg]'>홈</span>
          </Link>
        </li>

        {/* 최근 작업 버튼 */}
        <li className="flex justify-center mb-3">
          <Link to="/recent" className={!isSelected[1]?"flex flex-row text-center  block  rounded py-4 px-4 bg-blue-500  hover:text-blue hover:opacity-80 text-black":
                          "flex flex-row text-center  block  rounded py-4 px-4 bg-blue-500   text-blue"} 
           onClick={()=>select(1)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
          </svg>

            <span className='inline-block font-Nanum font-medium text-base mr-20 rotate-[-0.03deg]'>최근작업</span>
          </Link>
        </li>

        {/* 북마크 버튼 */}
        <li className="flex justify-center mb-3">
          <Link to="/bookmark" className={!isSelected[2]? "flex flex-row text-center    rounded py-4 px-4 bg-blue-500  hover:text-blue hover:opacity-80 text-black": 
            "flex flex-row text-center    rounded py-4 px-4 bg-blue-500  text-blue"}  onClick={() => select(2)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
            <span className='inline-block font-Nanum font-medium text-base mr-24 rotate-[-0.03deg]'>북마크</span>
          </Link>
        </li>

        {/* 구분선 */}
        <hr className="w-56 mx-auto h-px my-8 bg-line_gray border-0 dark:bg-gray-700"></hr>

        {/* 모든 프로젝트 */}
        <div className="py-2 flex  justify-center ">
			    <details className="group">

				  <summary className={!isSelected[3]? "w-56 justify-center rounded py-4 px-4 hover:text-blue hover:opacity-80 flex  text-center  items-center font-medium cursor-pointer list-none": 
                  "w-56 justify-center rounded py-4 px-4 text-blue flex  text-center  items-center font-medium cursor-pointer list-none"} onClick={() => clickProjects()}>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>

            <span className='inline-block  font-Nanum font-medium text-base rotate-[-0.03deg]'>모든 프로젝트</span>
					  <span className="ml-5  transition group-open:rotate-180">
              <svg className='stroke-line_gray' fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
            </span>
				  </summary>

				  <ul className='p-4'>
              
              <li className="flex justify-center mb-3  ">
                <Link to="folder" onClick={()=>{select(4)}} className={!isSelected[4]?"w-56 flex flex-row text-center    rounded py-4 px-4 text-black hover:text-blue hover:opacity-80 " 
                :"w-56 flex flex-row text-center    rounded py-4 px-4 text-blue  " } >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>

                  <span className='inline-block font-Nanum font-medium text-base rotate-[-0.03deg]'>선보고 후조치</span>
                </Link>
              </li>

                
                <li className="flex justify-center mb-3 ">
                  <Link to="folder" className="w-56 flex flex-row text-center    rounded py-4 px-4 bg-blue-500  hover:text-blue hover:opacity-80 text-black" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                  </svg>
                    <span className='inline-block font-Nanum font-medium text-base rotate-[-0.03deg]'>B104</span>
                  </Link>
                </li>

                {/* 새로운 폴더 만들기 */}
                <li className="flex justify-center mb-3 ">
                  <div className="hover:bg-white  w-56 flex flex-row text-center cursor-pointer  rounded py-4 px-4 " onClick={openModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}  className="w-6 h-6 mr-5 stroke-light_gray">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>

                    <span className='inline-block text-light_gray font-Nanum font-medium text-base rotate-[-0.03deg]' >새로운 폴더 만들기</span>
                  </div>
                </li>
              </ul>
            </details>
          </div>
          
        </ul>
       
      </div>
    
  );
};

export default Sidebar;
